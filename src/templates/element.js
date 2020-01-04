import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const mdnUrl = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"

export default function({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { title, contentCategories } = frontmatter

  return (
    <Layout title={title}>
      <SEO title={title} />
      <div className="blog-post">
        <h2>Content Categories</h2>
        <ul>
          {contentCategories.map((category, i) => {
            return <li key={i}>{category}</li>
          })}
        </ul>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <h2>Links</h2>
        <ul>
          <li>
            <a href={`${mdnUrl}/${title}`} target="_blank">
              MDN web docs
            </a>
          </li>
        </ul>
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
