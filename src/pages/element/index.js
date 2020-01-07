import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Page from "../../components/element/page"

export default () => {
  const data = useStaticQuery(graphql`
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
  `)

  const { edges: _posts } = data.allMarkdownRemark
  const posts = _posts.map(post => post.node)

  const _fields = data.allAdminYaml.edges[0].node.collections[0].fields
  const _contentCategoryOptions = _fields.filter(
    field => field.name === "contentCategories"
  )[0]
  const contentCategories = _contentCategoryOptions.options.map(
    option => option.label
  )

  return <Page posts={posts} contentCategories={contentCategories} />
}
