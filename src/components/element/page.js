import React from "react"
import styled from "@emotion/styled"

import Layout from "../layout"
import SEO from "../seo"
import Button from "../button"
import Elements from "../elements"
import SearchForm from "./search-form"

const Container = styled.div`
  position: relative;
  margin: 0 0 2rem;
  padding: 1.8em 1.4em 1.4em;
  border: 1px dashed currentColor;
`
const Heading = styled.h2`
  position: absolute;
  top: -0.5em;
  left: 1em;
  margin: 0;
  padding: 0 1em;
  background-color: #fff;
  font-weight: normal;
  font-style: italic;
  font-size: 1rem;
  font-family: "Noto Sans JP", sans-serif;
  letter-spacing: 0.08em;
`

const Hr = styled.hr`
  margin: 1rem 0;
  background-color: currentColor;
  opacity: 0.5;
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
      searchText: 'bb',
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

    this.setState({ selectedCategories, currentPosts, searchText: '' })
  }

  search(value) {
    const currentPosts = this.state.posts.filter(post => {
      return post.frontmatter.title.indexOf(value) > -1
    })

    this.setState({ currentPosts, searchText: value })
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
          <Hr />
          <SearchForm
            value={this.state.searchText}
            onInput={value => this.search(value)}
          />
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
