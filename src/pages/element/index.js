import React from "react"

import { StaticQuery, graphql } from "gatsby"
import Page from "../../components/element/page"

class ElementList extends React.Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      currentPosts: [],
    }
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

    this.setState({ posts, contentCategories })
  }

  render() {
    return (
      <Page
        posts={this.state.posts}
        contentCategories={this.state.contentCategories}
      />
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
