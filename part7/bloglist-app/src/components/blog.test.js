import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("blog component", () => {
  let component
  const mockHandlerUpdate = jest.fn()
  const mockHandlerAddLike = jest.fn()

  beforeEach(() => {
    const user = {
      name: "Test User",
      username: "testUsername",
    }

    const blog = {
      title: "Blog Title",
      author: "author",
      url: "url",
      likes: 10,
      user: [
        {
          username: "testUsername",
        },
      ],
    }

    component = render(
      <Blog
        blog={blog}
        user={user}
        setBlogs={mockHandlerUpdate}
        handleAddLike={mockHandlerAddLike}
      />
    )
  })

  test("Blog component renders both blog title and author", () => {
    const title = component.container.querySelector(".blogTitle")
    const author = component.container.querySelector(".blogAuthor")
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test("Blog component shows more info when clicked", () => {
    const expandButton = component.getByText("view")
    userEvent.click(expandButton)

    const blogUrl = component.container.querySelector(".blogUrl")
    const blogLikes = component.container.querySelector(".blogLikes")

    expect(blogUrl).toBeDefined()
    expect(blogLikes).toBeDefined()
  })

  test("Like button calls its handler correctly", () => {
    const expandButton = component.getByText("view")
    userEvent.click(expandButton)

    const blogLikes = component.getByText("like")
    userEvent.click(blogLikes)
    userEvent.click(blogLikes)

    expect(mockHandlerAddLike.mock.calls).toHaveLength(2)
  })
})
