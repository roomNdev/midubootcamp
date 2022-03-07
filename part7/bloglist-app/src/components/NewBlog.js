import PropTypes from "prop-types"
import React, { useState } from "react"
import { connect } from "react-redux"
import {setBlogs} from "../reducers/blogReducers"
import blogService from "../services/blogs"

const NewBlog = (props) => {
  const { notification } = props
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url,
      }
      console.log(newBlog)
      const response = await blogService.create(newBlog)
      notification(`New blog created '${title}' by ${author}`, "success")
      props.setBlogs(response)
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (err) {
      notification("Couldn't create a new blog", "error")
    }
  }

  return (
    <form onSubmit={handleNewBlog} id='create-new-blog-form' className="m-6 grid grid-cols-3 grid-rows-4 items-center justify-items-end gap-x-4 w-72">
      <p className="text-spanishviolet col-span-1 font-medium" >
        title:{" "}
      </p>
      <input
        id='title'
        type='text'
        value={title}
        name='title'
        onChange={({ target }) => setTitle(target.value)}
        className="rounded-lg m-3 col-span-2 p-1"
      />
      <p className="text-spanishviolet col-span-1 font-medium" >
        author:{" "}
      </p>
      <input
        id='author'
        type='text'
        value={author}
        name='author'
        onChange={({ target }) => setAuthor(target.value)}
        className="rounded-lg m-3 col-span-2 p-1"
      />
      <p className="text-spanishviolet col-span-1 font-medium" >
        url:{" "}
      </p>
      <input
        id='url'
        type='text'
        value={url}
        name='title'
        onChange={({ target }) => setUrl(target.value)}
        className="rounded-lg m-3 col-span-2 p-1"
      />
      <button type='submit' id='form-newBlog-submit-button' 
        className="ring-2 ring-spanishviolet rounded-xl p-1 justify-self-center col-span-3 text-spanishviolet font-medium">
        create
      </button>
    </form>
  )
}

const mapDispatchToProps = {
  setBlogs,
}

const ConnectedNotes = connect(
  null,
  mapDispatchToProps
)(NewBlog)
export default ConnectedNotes

NewBlog.propTypes = {
  setBlogs: PropTypes.func,
  blogs: PropTypes.array,
  notification: PropTypes.func,
}
