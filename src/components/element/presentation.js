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

export default ({
  posts,
  currentPosts,
  contentCategories,
  selectedCategories,
  searchText,
  clickCategory,
  search,
}) => {
  function isHidden(category) {
    const currentPostsContentCategories = currentPosts.reduce((arr, post) => {
      post.frontmatter.contentCategories.forEach(cat => {
        if (!arr.includes(cat)) arr.push(cat)
      })
      return arr
    }, [])
    return !currentPostsContentCategories.includes(category)
  }

  return (
    <Layout title="Element index">
      <SEO title="Element index" />

      <Container>
        <Heading>Filtering</Heading>
        <Ul>
          {contentCategories.map((category, i) => {
            return (
              <li key={i}>
                <Button
                  onClick={e => clickCategory(category)}
                  isActive={selectedCategories.includes(category)}
                  isHidden={isHidden(category)}
                >
                  {category}
                </Button>
              </li>
            )
          })}
        </Ul>
        <Hr />
        <SearchForm value={searchText} onInput={value => search(value)} />
      </Container>

      <Container>
        <Heading>Elements</Heading>
        <Elements
          elements={posts}
          currentElements={currentPosts.map(p => p.frontmatter.title)}
        />
      </Container>
    </Layout>
  )
}
