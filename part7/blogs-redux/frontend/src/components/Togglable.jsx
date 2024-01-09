import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div className='p-1' style={hideWhenVisible}>
        <button className='bg-sky-500 hover:bg-sky-700 rounded-full p-2' id='toggable-hidden' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className="border-2 border-blue-500 bg-gray-200 w-fit p-2 rounded" style={showWhenVisible}>
        {props.children}
        <button className='bg-red-500 hover:bg-red-700 rounded-full p-2 w-full' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable