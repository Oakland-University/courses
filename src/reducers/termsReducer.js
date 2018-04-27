export default function reducer(
  state = {
    terms: [],
    fetching: false,
    fetched: false,
    error: null,
    current_term: null,
    term_bounds: null
  },
  action
) {
  switch (action.type) {
    case 'FETCH_TERMS_START': {
      return { ...state, fetching: true, fetched: false }
    }
    case 'FETCH_TERMS_ERRORS': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'RECEIVE_TERMS': {
      let current_term,
        term_start,
        term_end = null
      action.payload.forEach(term => {
        if (term.current === true) {
            current_term = term
            term_start = parseInt(current_term.start, 10)
            term_end = parseInt(current_term.end, 10)
        }
      })
      const term_bounds = [term_start, term_end]
      return {
        ...state,
        fetching: false,
        fetched: true,
        terms: action.payload,
        current_term: current_term,
        term_bounds: term_bounds
      }
    }
    case 'RECEIVE_CURRENT_TERM': {
      const terms_bounds = [parseInt(action.payload.start, 10), parseInt(action.payload.end, 10)]
      return {
        ...state,
        current_term: action.payload,
        term_bounds: terms_bounds
      }
    }
    default:
      return state
  }
}
