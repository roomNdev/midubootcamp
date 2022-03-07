/* eslint-disable react/prop-types */
import PropTypes from "prop-types"
import React, { useState } from "react"

const Togglable = props => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible}  >
        <button onClick={toggleVisibility} className="text-spanishviolet text-2xl  rounded-xl p-2 m-4 ring-2 ring-spanishviolet">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="flex items-center flex-col">
        {props.children}
        <button onClick={toggleVisibility} className="text-spanishviolet font-semibold rounded-xl p-1 mb-4 mx-auto ring-2 ring-spanishviolet ">cancel</button>
      </div>
    </>
  )
}

export { Togglable }

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
