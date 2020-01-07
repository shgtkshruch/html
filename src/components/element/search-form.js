import React from "react"

export default ({ value, onInput }) => {
  function handleChange(e) {
    const value = e.target.value
    onInput(value)
  }

  return (
    <>
      <label htmlFor="tagName">Tag Name</label>
      <input
        type="text"
        value={value}
        onChange={e => handleChange(e)}
        placeholder="ex. html"
        id="tagName"
      />
    </>
  )
}
