import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import {NewBlog} from './NewBlog'

describe('New Blog form component', () => {
  test('calls properly the handler',()=>{
    const handleNewBlog = jest.fn()

    const component = render(<NewBlog handleNewBlog={handleNewBlog}/>)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#create-new-blog-form')

    fireEvent.change(title, 'new title')
    fireEvent.change(author, 'new author')
    fireEvent.change(url, 'new url')
    fireEvent.submit(form)

    expect(handleNewBlog.mock.calls).toHaveLength(1)
    console.log(handleNewBlog.mock)
    // .toBe('new title')
  })
})