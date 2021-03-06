import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

import { Link } from "gatsby"

const buttonColor = `#3d456d`
const listMargin = `0.6`

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 ${listMargin * -1}em;
  list-style-type: none;
`

const Li = styled.li`
  margin-right: ${listMargin}em;
  margin-bottom: ${listMargin}em;
`

const linkStyle = css`
  display: block;
  padding: 0.3em 0.7em;
  color: ${buttonColor};
  border: 1px solid currentColor;
  border-radius: 3px;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${buttonColor};
    color: #fff;
  }
`

const unSelectedStyle = css`
  ${linkStyle};

  color: #9ca2bf;
  opacity: 0.4;
  pointer-events: none;
`

export default ({ elements, currentElements }) => {
  return (
    <Ul>
      {elements.map((element, i) => {
        return (
          <Li key={i}>
            <Link
              to={`/element/${element.title}/`}
              css={
                currentElements.includes(element.title)
                  ? linkStyle
                  : unSelectedStyle
              }
            >
              {element.title}
            </Link>
          </Li>
        )
      })}
    </Ul>
  )
}
