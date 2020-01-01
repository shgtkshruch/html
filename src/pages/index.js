import React from "react"
import { Link } from "gatsby"

import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout title={ data.site.siteMetadata.title }>
      <SEO title="Home" />
      <h1>HTML Element List</h1>
      <Link to="/element/">Element List</Link>
    </Layout>
  )
}

export default IndexPage
