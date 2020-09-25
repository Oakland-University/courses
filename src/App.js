import React, { Suspense, useEffect } from 'react'
import CoursesTabs from './components/CoursesTabs'
import { fetch_courses } from './actions/coursesActions'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetch_courses('current-term'))
  }, [dispatch])

  return (
    <Suspense fallback={<div />}>
      <CoursesTabs />
    </Suspense>
  )
}

export default App
