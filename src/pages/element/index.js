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

    this.setState(state => {
      return {
        selectedCategories,
      }
    })
  }

  isHidden(category) {
    // return this.state.categories.includes(category)
    return true
  }

  componentDidMount() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    const _fields = data.allAdminYaml.edges[0].node.collections[0].fields
    const _contentCategoryOptions = _fields.filter(
      field => field.name === "contentCategories"
    )[0]
    const contentCategories = _contentCategoryOptions.options.map(
      option => option.label
    )

    this.setState({ posts, contentCategories })
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
          {this.state.posts.map(({ node: post }, i) => {
            if (
              post.frontmatter.contentCategories.filter(cat =>
                this.state.selectedCategories.includes(cat)
              ).length !== this.state.selectedCategories.length
            )
              return false

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
