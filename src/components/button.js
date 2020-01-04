import React from "react"
import styled from "@emotion/styled"

const Button = styled.button`
  padding: 0.3em 1rem;
  background-color: transparent;
  border: 1px solid currentColor;
  border-radius: 3px;
  color: #f39723;
  font-family: sans-serif;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f39723;
    color: #fff;
  }
`

const ActiveButton = styled(Button)`
  background-color: #f39723;
  color: #fff;
`

const HiddenButton = styled(Button)`
  background-color: #ccc;
  color: #fff;
  pointer-events: none;
`

export default ({ children, isActive, isHidden, onClick }) => {
  if (isHidden) return (<HiddenButton>{children}</HiddenButton>)

  return isActive ? (
    <ActiveButton onClick={onClick}>{children}</ActiveButton>
  ) : (
    <Button onClick={onClick}>{children}</Button>
  )
}
