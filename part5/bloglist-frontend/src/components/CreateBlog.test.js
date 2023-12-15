import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () =>
{
    let container,
        mockCreateBlog;

    beforeEach(() => 
    {  
        mockCreateBlog = jest.fn()
        container = render(<CreateBlog createBlog={mockCreateBlog}/>).container
    })

    test('createBlog receives the correct blog parameters', async () => 
    {
        const newTitle = 'new Title'
        const newAuthor = 'new Author'
        const newUrl = 'new Url'

        const user = userEvent.setup()
        const createButton = screen.getByText('create')
        const inputs = screen.getAllByRole('textbox')

        const titleInput = inputs.find( i => i.name === 'Title')
        const authorInput = inputs.find( i => i.name === 'Author')
        const urlInput = inputs.find( i => i.name === 'Url')

        await user.type(titleInput, newTitle)
        await user.type(authorInput, newAuthor)
        await user.type(urlInput, newUrl)

        await user.click(createButton)

        const parameterReceived = mockCreateBlog.mock.calls[0][0];
        
        expect(mockCreateBlog.mock.calls).toHaveLength(1);
        expect(parameterReceived.title).toBe(newTitle);
        expect(parameterReceived.author).toBe(newAuthor);
        expect(parameterReceived.url).toBe(newUrl);
    })
})