import React from "react"

import { Link, StaticQuery, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const contentCategories = [
  'Metadata content',
  'Flow content',
  'Sectioning content'
]

class ElementList extends React.Component {
  constructor() {
    super()
    this.state = { selectedCategories: [] }

    this.clickCategory = this.clickCategory.bind(this);
  }

  clickCategory(category) {
    console.log(category);
    this.setState(state => ({
      selectedCategories: [category]
    }))
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

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
        allMarkdownRemark(sort: {fields: frontmatter___order, order: ASC}) {
          edges {
            node {
              frontmatter {
                title
                order
                contentCategories
              }
            }
          }
        }
      }
    `}
    render={data => <ElementList data={data} />}
  />
)

