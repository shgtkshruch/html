import React from "react"

import { Link, StaticQuery, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

class ElementList extends React.Component {
  constructor() {
    super()
    this.state = { selectedCategories: [] }

    this.clickCategory = this.clickCategory.bind(this);
  }

  clickCategory(category) {
    this.setState(state => ({
      selectedCategories: [category]
    }))
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    const _fields = data.allAdminYaml.edges[0].node.collections[0].fields
    const _contentCategoryOptions = _fields.filter(field => field.name === 'contentCategories')[0]
    const contentCategories = _contentCategoryOptions.options.map(option => option.label)

    return (
      <Layout title="Element index">
        <SEO title="Element index" />

        <ul>
          {contentCategories.map((category, i) => {
            return (
              <li key={i}>
                <button onClick={(e) => this.clickCategory(category)}>{category}</button>
              </li>
            )
          })}
        </ul>

        <ul>
          {posts.map(({ node:post }, i) => {
            if (!post.frontmatter.contentCategories.includes(this.state.selectedCategories[0])) return

            return (
              <li key={i}>
                <Link to={`/element/${post.frontmatter.title}/`}>
                  {post.frontmatter.title}
                </Link>
                {post.frontmatter.contentCategories.map((category, j) => {
                  return (
                    <span key={j} style={{ paddingLeft: `10px` }}>[{category}]</span>
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
      allMarkdownRemark(sort: {fields: frontmatter___order, order: ASC}) {
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

