import React from "react"

export default ({ onInput }) => {
  function input(e) {
    const value = e.target.value
    onInput(value)
  }

  return (
    <>
      <label htmlFor="tagName">Tag Name</label>
      <input
        type="text"
        onInput={e => input(e)}
        placeholder="ex. html"
        id="tagName"
      />
    </>
  )
}
