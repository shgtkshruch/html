const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              contentCategories
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }

  createPage({
    path: path.join('element/index'),
    component: path.resolve(__dirname,"./src/pages/element/index.js")
  })

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: path.join('element', node.frontmatter.title),
      component: path.resolve(__dirname, "./src/templates/element.js"),
      context: {
        id: node.id,
      }
    })
  })
}
