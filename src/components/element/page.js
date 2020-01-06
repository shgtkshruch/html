import React from "react"
import styled from "@emotion/styled"

import Layout from "../layout"
import SEO from "../seo"
import Button from "../button"
import Elements from "../elements"
import SearchForm from "./search-form"

const blue = `#1d2652`

const Container = styled.div`
  margin: 0 0 3rem;
  padding: 1.4em;
  border: 1px dashed ${blue};
`
const Heading = styled.h2`
  font-weight: normal;
  font-style: italic;
  font-size: 1rem;
  font-family: "Noto Sans JP", sans-serif;
  letter-spacing: 0.08em;
  color: ${blue};

  &::before {
    content: "-";
    padding-right: 0.2em;
  }
`

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0 0 -0.6em;

  li {
    margin-right: 0.6em;
    margin-bottom: 0.6em;
  }
`

export default class Page extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      currentPosts: [],
      contentCategories: [],
      selectedCategories: [],
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

    const currentPosts = this.state.posts.filter(post => {
      return (
        post.frontmatter.contentCategories.filter(cat =>
          selectedCategories.includes(cat)
        ).length === selectedCategories.length
      )
    })

    this.setState({ selectedCategories, currentPosts })
  }

  search(value) {
    const currentPosts = this.state.posts.filter(post => {
      return post.frontmatter.title.indexOf(value) > -1
    })

    this.setState({ currentPosts })
  }

  isHidden(category) {
    const currentPostsContentCategories = this.state.currentPosts.reduce(
      (arr, post) => {
        post.frontmatter.contentCategories.forEach(cat => {
          if (!arr.includes(cat)) arr.push(cat)
        })
        return arr
      },
      []
    )
    return !currentPostsContentCategories.includes(category)
  }

  componentDidMount() {
    const { posts, contentCategories } = this.props

    this.setState({ posts, contentCategories, currentPosts: posts })
  }

  render() {
    return (
      <Layout title="Element index">
        <SEO title="Element index" />

        <Container>
          <Heading>Filtering</Heading>
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
          <SearchForm onInput={value => this.search(value)} />
        </Container>

        <Container>
          <Heading>Elements</Heading>
          <Elements
            elements={this.state.posts}
            currentElements={this.state.currentPosts.map(
              p => p.frontmatter.title
            )}
          />
        </Container>
      </Layout>
    )
  }
}
