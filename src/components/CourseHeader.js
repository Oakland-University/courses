import React from 'react'

import amber from '@material-ui/core/colors/amber'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import { is_off_campus } from '../utils/offCampus'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  classHeader: {
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center',
  },
  classHeaderWaitList: {
    backgroundColor: amber[200],
    textAlign: 'center',
  },
  classHeaderOffCampus: {
    backgroundColor: '#D79873',
    textAlign: 'center',
  },
  classHeaderSpanDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  subHeaderDiv: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
  },
  courseTitle: {
    fontWeight: 'bolder',
  },
  courseInfo: {
    fontWeight: '500',
    color: '#000',
  },
}))

const determineColor = (course) => {
  const textAlign = 'center'
  let backgroundColor = '#B89F74' 

  if (course.meetings.length !== 0 && is_off_campus(course.meetings[0].campus)) {
    backgroundColor = '#D79873'
    return { backgroundColor, textAlign }
  } else {
    return { backgroundColor, textAlign }
  }
}

export default function CourseHeader(props) {
  const classes = useStyles()
  const { course } = props

  return (
    <CardHeader
      style={determineColor(course)}
      title={
        <Typography tabIndex='0' className={classes.courseTitle}>
          {course.courseTitle}
        </Typography>
      }
      key={course.crn}
      subheader={
        <div className={classes.classHeaderSpanDiv}>
          <span tabIndex='0' className={classes.courseInfo}>
            {`${course.subjectCode}-${course.subjectNumber}-${course.section}-${course.crn}`}
          </span>
          <div className={classes.subHeaderDiv}>
            {course.waitlist !== '0' && (
              <span tabIndex='0' className={classes.courseInfo}>
                Waitlist: {course.waitlist}
              </span>
            )}
            <span tabIndex='0' className={classes.courseInfo}>
              Credits: {course.credit}
            </span>
          </div>
        </div>
      }
    />
  )
}
