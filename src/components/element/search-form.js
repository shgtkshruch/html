import React from "react"
import styled from "@emotion/styled"

const Input = styled.input`
  padding: 0.2em 0.6em;
  color: inherit;
  font-size: 0.9rem;
  border: 1px solid currentColor;
`

const Label = styled.label`
  font-size: 0.9rem;
  margin-right: 1em;
  color: currentColor;
`
export default ({ value, onInput }) => {
  function handleChange(e) {
    const value = e.target.value
    onInput(value)
  }

  return (
    <>
      <Label htmlFor="tagName">Tag</Label>
      <Input
        type="text"
        value={value}
        onChange={e => handleChange(e)}
        placeholder="ex. html"
        id="tagName"
      />
    </>
  )
}
