import React from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import ErrorMessages from './ErrorMessages'
import Instructors from './Instructors'
import Meetings from './Meetings'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  courseContainer: {
    flex: '1 1 auto',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  card: {
    backgroundColor: '#fafafa',
    minHeight: 336,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: 290,
  },
  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    marginTop: 50,
    justifyContent: 'center',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    marginTop: '2em',
  },
  waitlistContainer: {
    marginTop: '1em',
  },
  actions: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 45,
    alignContent: 'center'
  },
}))

const Course = ({ classes, courses }) => {
  return courses.map((course) => {
    return (
      <div className={classes.courseContainer} key={course.crn}>
        <div className={classes.container}>
          <Card className={classes.card}>
            <CourseHeader course={course} />
            <CardContent className={classes.content}>
              <div
                className={course.waitlist === '0' ? classes.container : classes.waitlistContainer}
              >
                <Meetings meetings={course.meetings} />
              </div>
            </CardContent>
            <CardActions className={classes.actions}>
              <CourseDetails course={course} />
              <Instructors instructors={course.instructors} />
            </CardActions>
          </Card>
        </div>
      </div>
    )
  })
}

export default function Courses() {
  const classes = useStyles()
  const courses = useSelector((state) => state.courses)
  const courses_fetching = useSelector((state) => state.fetching)
  const courses_error = useSelector((state) => state.error)
  const courses_fetched = useSelector((state) => state.fetched)

  if (courses_fetched && !courses_error && courses.length !== 0) {
    return (
      <div className={classes.root}>
        <Course courses={courses} classes={classes} />
      </div>
    )
  } else if (courses_fetched && courses_error) {
    return (
      <div className={classes.error}>
        <ErrorMessages />
      </div>
    )
  } else if (courses_fetching) {
    return (
      <div className={classes.loading}>
        <CircularProgress color='secondary' size={50} />
      </div>
    )
  } else if (courses.length === 0) {
    return (
      <Typography className={classes.empty} tabIndex='0'>
        You currently have no courses for this semester.
      </Typography>
    )
  }
}
