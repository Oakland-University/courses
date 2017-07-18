export const getTerms = async url => {
  try {
    const response = await fetch(url, { credentials: "include" })
    const terms = await response.json()
    return terms.terms
  } catch (err) {
    console.error(err)
    return err
  }
}

export const getCourses = async (term, url) => {
  try {

    let data = {
      code: term.code,
      description: term.description,
      current: term.code,
      end: term.end,
      start: term.start
    }

    const formBody = Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")

    const response = await fetch(url, {
      body: formBody,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
    const courses = await response.json()
    return courses.courses
  } catch (err) {
    return err
  }
}

export const getCredits = async url => {
  try {
    const response = await fetch(url, { credentials: "include" })
    const grades = await response.json()
    return grades.grades
  } catch (err) {
    return err
  }
}