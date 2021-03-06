import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import ErrorMessages from './ErrorMessages'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fafafa',
  },
  cardBottom: {
    paddingBottom: 16,
  },
  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary,
    backgroundColor: '#fafafa',
  },
  classHeader: {
    backgroundColor: theme.palette.primary.light,
  },
  classHeaderSpan: {
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.75)',
    fontSize: 16,
  },
  tableCell: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 600,
    fontSize: 14,
    width: '33%',
  },
  empty: {
    textAlign: 'center',
  },
  mobile: {
    overflowX: 'scroll',
  },
  link: {
    marginLeft: 3,
    color: '#1a0dab',
  },
}))

const CourseGrades = ({ courses }) => {
  return courses.map((course, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          {course.subjectCode} - {course.subjectNumber}
        </TableCell>
        <TableCell>{course.grade.credit}</TableCell>
        <TableCell>{course.grade.grade}</TableCell>
      </TableRow>
    )
  })
}

const Credits = ({ credits }) => {
  return credits.map((credit, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{credit.standing}</TableCell>
        <TableCell>{credit.credits}</TableCell>
        <TableCell>{credit.gpa}</TableCell>
      </TableRow>
    )
  })
}

const Grades = (props) => {
  const classes = useStyles()
  const credits = useSelector((state) => state.credits)
  const courses = useSelector((state) => state.courses)
  const courses_error = useSelector((state) => state.error)
  const { mobile } = props

  if (courses_error) {
    return (
      <div className={classes.error}>
        <ErrorMessages />
      </div>
    )
  } else if (courses.length === 0) {
    return <Typography className={classes.empty}>No data to display</Typography>
  } else {
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.classHeader}
          title={
            <Typography tabIndex='0' className={classes.classHeaderSpan}>
              Grades and Credits
            </Typography>
          }
        />
        <CardContent className={mobile ? classes.mobile : null}>
          <div className={classes.cardBottom}>
            <Typography>
            The way the university calculates grades has changed as of the Fall 2018 semester. If
            you have any questions, refer to the document:
            <a
              className={classes.link}
              target='_blank'
              aria-describedby='new-window-2'
              rel='noopener noreferrer'
              href='https://docs.google.com/document/d/182ghMFyrH7qpZ5FcJ7KrMZ0AOc6uda6ytRak-KrxXdM/edit'
            >
              Office of the Registrar Letter Grade Scale FAQs
            </a>
            </Typography>
          </div>
          <Divider variant='middle' />
          {credits.length !== 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell} scope='col'>
                    Level
                  </TableCell>
                  <TableCell className={classes.tableCell} scope='col'>
                    Grades
                  </TableCell>
                  <TableCell className={classes.tableCell} scope='col'>
                    GPA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Credits credits={credits} />
              </TableBody>
            </Table>
          )}
          {courses.length !== 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell} scope='col'>
                    Course
                  </TableCell>
                  <TableCell className={classes.tableCell} scope='col'>
                    Credits
                  </TableCell>
                  <TableCell className={classes.tableCell} scope='col'>
                    Grades
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CourseGrades courses={courses} />
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    )
  }
}

export default Grades
