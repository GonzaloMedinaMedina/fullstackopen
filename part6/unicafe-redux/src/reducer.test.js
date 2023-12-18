import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {    
    const newState = increment('GOOD')
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const newState = increment('OK')
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const newState = increment('BAD')
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset stats set all to zero', () => {
    increment('GOOD')
    const newState = increment('ZERO')
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  const increment = ((type = '') => 
  {
    const action = {
      type: type
    }

    const state = initialState

    deepFreeze(state)
    return counterReducer(state, action)
  })
})