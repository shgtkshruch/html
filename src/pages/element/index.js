import React from "react"

import { Link, StaticQuery, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

class ElementList extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout title="Element index">
        <SEO title="Element index" />
        <ul>
          {posts.map(({ node:post }) => {
            return (
              <li>
                <Link to={`element/${post.frontmatter.title}`}>
                  {post.frontmatter.title}
                </Link>
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
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
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

