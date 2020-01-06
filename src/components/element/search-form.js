import React from "react"

export default ({ onInput }) => {
  function input(e) {
    const value = e.target.value
    onInput(value)
  }

  return <input type="text" onInput={e => input(e)} />
}
