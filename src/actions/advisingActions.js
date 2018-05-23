import { get_advising } from '../api/api'

/* global advising_url */

export function fetch_advising(current_term) {
  return function(dispatch) {
    dispatch({ type: 'FETCH_ADVISING_START', payload: {} })
    get_advising(advising_url)
      .then(advising => {
        dispatch({ type: 'RECEIVE_ADVISING', payload: advising })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_ADVISING_ERROR', payload: err })
      })
  }
}
