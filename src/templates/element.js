import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout title={frontmatter.title}>
      <SEO title={frontmatter.title} />
      <div className="blog-post">
        <h2>Content Categories</h2>
        <ul>
          {frontmatter.contentCategories.map((category, i) => {
            return <li key={i}>{category}</li>
          })}
        </ul>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        contentCategories
      }
    }
  }
`
