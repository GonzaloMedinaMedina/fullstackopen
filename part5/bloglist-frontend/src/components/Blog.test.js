import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container,
    user,
    blog,
    mockDeleteBlog,
    mockIncrementLikesHandler;

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
    
    mockDeleteBlog = jest.fn()
    mockIncrementLikesHandler = jest.fn().mockReturnValue({status: 204})

    container = render(<Blog blog={blog} user={user} deleteBlog={mockDeleteBlog} incrementLikesHandler={mockIncrementLikesHandler}/>).container
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

  test('likes handler function is called two times when user clicks twice on like button', async () =>
  {
    const userSetup = userEvent.setup()
    const likeButton = screen.getByText('like')
    await userSetup.click(likeButton)
    await userSetup.click(likeButton)

    expect(mockIncrementLikesHandler.mock.calls).toHaveLength(2)
  })
})