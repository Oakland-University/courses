import { get_credits } from '../api/api'

/* global grades_url */

export function fetch_credits() {
  return function(dispatch) {
    dispatch({ type: 'FETCH_CREDITS_START', payload: {}})
    get_credits(grades_url)
      .then(credits => {
        dispatch({ type: 'RECEIVE_CREDITS', payload: credits })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_CREDITS_ERROR', payload: err })
      })
  }
}