export const get_terms = async url => {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    const terms = await response.json()
    return terms
  } catch (err) {
    return err
  }
}

export const get_courses = async (term, url) => {
  try {
    let data = {
      code: term.code,
      description: term.description,
      current: term.code,
      end: term.end,
      start: term.start
    }

    const formBody = Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')

    const response = await fetch(url, {
      body: JSON.stringify({
        code: term.code,
        description: term.description,
        state_date: term.start,
        end_date: term.end,
        current: term.current
      }),
      credentials: 'include',
      headers: {
        //Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'POST'
    })
    const courses = await response.json()
    return courses
  } catch (err) {
    return err
  }
}

export const get_credits = async url => {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    const credits = await response.json()
    return credits
  } catch (err) {
    return err
  }
}

export const get_advising = async url => {
  try {
    const response = await fetch(url, { credentials: 'include' })
    const advising = await response.json()
    return advising.advising.status
  } catch (err) {
    throw err
  }
}
