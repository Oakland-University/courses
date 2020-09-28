/* global token */
/* global is_demo */

import courses from './courses.json'

export const get_courses = async (term, url) => {
  if (is_demo) {
    return courses
  }

  try {
    const response = await fetch(url + term, {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}
