import React from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaLink } from 'react-icons/fa';

const mdnUrl = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
const linkColor = `#063173`;

const A = styled.a`
  color: ${linkColor};
  text-decoration: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 0;
    height: 3px;
    background-color: currentColor;
    transition: width 0.2s ease-in-out;
  }

  &:hover {
    &::before {
      width: 100%;
    }
  }
`
const Icon = styled(FaLink)`
  width: 0.8em;
  height: 0.6em;
  color: inherit;
`

const Li = styled.li`
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 2px;
    width: 0.5em;
    background-color: ${linkColor};
  }
`

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
          <Li>
            <A href={`${mdnUrl}/${title}`} target="_blank">
              MDN web docs
              <span style={{ marginLeft: `0.4em` }}>[</span>
              <Icon />
              <span>]</span>
            </A>
          </Li>
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
