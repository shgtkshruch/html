import React from "react"
import styled from "@emotion/styled"

import { Link, StaticQuery, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Button from "../../components/button"

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  list-style-type: none;

  li {
    margin-right: 0.5em;
    margin-bottom: 0.5em;
  }
`

class ElementList extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      currentPosts: [],
      contentCategories: [],
      selectedCategories: []
    }

    this.clickCategory = this.clickCategory.bind(this)
    this.isHidden = this.isHidden.bind(this)
  }

  clickCategory(category) {
    let selectedCategories = []

    if (this.state.selectedCategories.includes(category)) {
      selectedCategories = this.state.selectedCategories.filter(
        cat => cat !== category
      )
    } else {
      selectedCategories = [...this.state.selectedCategories, category]
    }

    this.setState({ selectedCategories })
  }

  isHidden(category) {
    const currentPostsContentCategories = this.state.currentPosts.reduce((arr, post) => {
      post.frontmatter.contentCategories.forEach(cat => {
        if (!arr.includes(cat)) arr.push(cat)
      })
      return arr
    }, [])
    return !currentPostsContentCategories.includes(category)
  }

  componentDidMount() {
    const { data } = this.props
    const { edges: _posts } = data.allMarkdownRemark
    const posts = _posts.map(post => post.node)

    const _fields = data.allAdminYaml.edges[0].node.collections[0].fields
    const _contentCategoryOptions = _fields.filter(
      field => field.name === "contentCategories"
    )[0]
    const contentCategories = _contentCategoryOptions.options.map(
      option => option.label
    )

    this.setState({ posts, contentCategories, currentPosts: posts })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const currentPosts = this.state.posts.filter((post) => {
      return (post.frontmatter.contentCategories.filter(cat =>
              this.state.selectedCategories.includes(cat)
      ).length === this.state.selectedCategories.length)
    })

    if (currentPosts.length === this.state.currentPosts.length) return false

    this.setState({ currentPosts })
  }

  render() {
    return (
      <Layout title="Element index">
        <SEO title="Element index" />

        <Ul>
          {this.state.contentCategories.map((category, i) => {
            return (
              <li key={i}>
                <Button
                  onClick={e => this.clickCategory(category)}
                  isActive={this.state.selectedCategories.includes(category)}
                  isHidden={this.isHidden(category)}
                >
                  {category}
                </Button>
              </li>
            )
          })}
        </Ul>

        <ul>
          {this.state.currentPosts.length > 0 && this.state.currentPosts.map((post, i) => {
            return (
              <li key={i}>
                <Link to={`/element/${post.frontmatter.title}/`}>
                  {post.frontmatter.title}
                </Link>
                {post.frontmatter.contentCategories.map((category, j) => {
                  return (
                    <span key={j} style={{ paddingLeft: `10px` }}>
                      [{category}]
                    </span>
                  )
                })}
              </li>
            )
          })}
        </ul>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        allAdminYaml {
          edges {
            node {
              collections {
                fields {
                  options {
                    label
                  }
                  name
                  label
                }
              }
            }
          }
        }
        allMarkdownRemark(sort: { fields: frontmatter___order, order: ASC }) {
          edges {
            node {
              frontmatter {
                contentCategories
                order
                title
              }
            }
          }
        }
      }
    `}
    render={data => <ElementList data={data} />}
  />
)
