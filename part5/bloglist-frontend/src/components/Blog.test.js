import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container,
    user,
    blog,
    deleteBlog;

  beforeEach(() => 
  {
    user = {
      username: 'fakeUser'
    }

    blog = {
      title: 'blog title',
      author: 'blog author',
      likes: 3,
      url: 'fake url',
      user: user
    }
    
    deleteBlog = () => {}
    container = render(<Blog blog={blog} user={user} deleteBlog={deleteBlog}/>).container
  })

  test('renders blog', () => {
    const visibleElement = container.querySelector('.visible')
    const hiddenElement = container.querySelector('.hidden')

    expect(visibleElement).toHaveStyle('display: none')
    expect(hiddenElement).toHaveStyle('display: block')
    expect(visibleElement).toBeDefined()
    expect(hiddenElement).toBeDefined()
  })

  test('likes and url are displayed when user clicks on view button', async () => 
  {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const visibleElement = container.querySelector('.visible')
    const hiddenElement = container.querySelector('.hidden')

    expect(visibleElement).toHaveStyle('display: block')
    expect(hiddenElement).toHaveStyle('display: none')
    expect(visibleElement).toBeDefined()
    expect(hiddenElement).toBeDefined()
  })
})