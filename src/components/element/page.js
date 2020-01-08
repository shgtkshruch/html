import React from "react"

import Presentation from "./presentation"

export default class Page extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      currentPosts: [],
      contentCategories: [],
      selectedCategories: [],
      searchText: "",
    }

    this.clickCategory = this.clickCategory.bind(this)
    this.search = this.search.bind(this)
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

    this.setState({ selectedCategories, currentPosts, searchText: "" })
  }

  search(value) {
    const currentPosts = this.state.posts.filter(post => {
      return post.frontmatter.title.indexOf(value) > -1
    })

    this.setState({ currentPosts, searchText: value })
  }

  componentDidMount() {
    const { posts, contentCategories } = this.props

    this.setState({ posts, contentCategories, currentPosts: posts })
  }

  render() {
    return (
      <Presentation
        posts={this.state.posts}
        currentPosts={this.state.currentPosts}
        contentCategories={this.state.contentCategories}
        selectedCategories={this.state.selectedCategories}
        searchText={this.state.searchText}
        clickCategory={this.clickCategory}
        search={this.search}
      />
    )
  }
}
