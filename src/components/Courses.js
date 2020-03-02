// @flow weak

import React from 'react'
import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import ExpandableCourse from './ExpandableCourse'
import Instructors from './Instructors'
import Meetings from './Meetings'
import PropTypes from 'prop-types'
import WaitlistCourse from './WaitlistCourse'
import { connect } from 'react-redux'
import { fetch_courses } from './../actions/coursesActions'
import { getBookButton } from './BuyBooks'
import { getPrintButton } from './PrintCourses'
import { translate } from 'react-i18next'

import Info from '@material-ui/icons/Info'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  courseContainer: {
    flex: '1 1 auto',
    padding: '1em'
  },

  buttonsDiv: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },

  button: {
    margin: theme.spacing.unit
  },

  rightIcon: {
    marginLeft: theme.spacing.unit
  },

  coursesDiv: {
    display: 'flex',
    flexFlow: 'wrap'
  },

  coursesDivMobile: {
    display: 'flex',
    flexDirection: 'column'
  },

  card: {
    backgroundColor: '#fafafa'
  },

  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center'
  },

  empty: {
    textAlign: 'center'
  },

  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },

  infoCard: {
    margin: 10,
    marginTop: 20,
    borderLeft: '10px solid #31708F'
  },

  header: {
    borderBottom: '1px solid #d3d3d3',
    borderRadius: 0,
    boxShadow: 'none',
    padding: '10px',
  },

  avatar: {
    minWidth: 32
  },

  icon: {
    color: '#31708F',
    fontSize: 32
  },

  headerContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
  },

  sampleColor: {
    height: "15px",
    width: "15px",
    backgroundColor: "#D79873",
    alignSelf: "center",
    borderRadius: "5px",
    paddingLeft: "5px",
  },

  notificationText: {
    paddingLeft: 0,
  }
})

class Courses extends React.Component {
  componentDidMount() {
    const { current_term } = this.props
    this.props.fetch_courses(current_term)
  }

  getCourses = () => {
    const { classes, courses, mobile } = this.props
    let elements = []
    for (let i = 0, total = courses.length; i < total; i++) {
      if (courses[i].meetings.length > 1 || courses[i].instructors.length > 1) {
        elements.push(
          <ExpandableCourse
            course={courses[i]}
            key={'expandable' + Math.random()}
            mobile={mobile}
          />
        )
      } else if (!Object.is(courses[i].waitList, '0')) {
        elements.push(
          <WaitlistCourse
            course={courses[i]}
            key={'waitlist' + Math.random()}
            mobile={mobile}
          />
        )
      } else {
        elements.push(
          <div
            className={classes.courseContainer}
            key={courses[i].crn + i + Math.random()}
          >
            <div style={{ marginTop: '1em' }}>
              <Card
                className={classes.card}
                key={courses[i].crn + i + Math.random()}
              >
                <CourseHeader mobile={mobile} course={courses[i]} />
                <CardContent
                  className={classes.content}
                  key={courses[i].crn + i + Math.random()}
                >
                  <div>
                    <div
                      style={{ marginTop: '1em' }}
                      key={courses[i].crn + i + Math.random()}
                    >
                      <Meetings meetings={courses[i].meetings} />
                    </div>
                  </div>
                </CardContent>
                <CardActions
                  key={courses[i].crn + i + Math.random()}
                  style={{ justifyContent: 'center', flexWrap: 'wrap' }}
                >
                  <CourseDetails course={courses[i]} />
                  <Instructors teachers={courses[i].instructors} />
                </CardActions>
              </Card>
            </div>
          </div>
        )
      }
    }
    return elements
  }

  hasOffCampusCourses = () => {
    const {courses} = this.props
    for (let i = 0;i < courses.length; i++) {
      return courses[i].meetings.some(meeting => meeting.campus !== "Main Campus" && meeting.campus !== "Internet")
    }
  }

  render() {
    const {
      books,
      current_term,
      classes,
      courses_error,
      courses_fetched,
      courses_fetching,
      mobile
    } = this.props
    if (courses_error) {
      return (
        <div>
          <Typography variant="h3" className={classes.empty} tabIndex="0">
            No Courses.
          </Typography>
        </div>
      )
    } else if (courses_fetching) {
      return (
        <div className={classes.loading}>
          <CircularProgress
            color="secondary"
            className={classes.progress}
            size={50}
          />
        </div>
      )
    } else if (courses_fetched) {
      return (
        <div ref={el => (this.componentRef = el)}>
          <div className={classes.buttonsDiv}>
            {getBookButton(
              books,
              current_term.description,
              mobile,
              classes.rightIcon
            )}
            {getPrintButton(
              current_term,
              mobile,
              classes.rightIcon
            )}
          </div>
          {this.hasOffCampusCourses()===true &&
            (
            <Card className={classes.infoCard}>
              <CardHeader
              className = {classes.header}
              classes={{
                title: classes.headerContent
              }}
              avatar= {
                <Info className={classes.icon} />
              }
              title={
                <div className={classes.headerContent}>
                  <Typography>Courses not taken at the main campus will now appear as this color:</Typography>&nbsp;<div className={classes.sampleColor}/>
                </div>
              }
              >
              </CardHeader>
            </Card>
            )}
          <div className={classes.buttonDiv}>
          </div>
          <div
            className={mobile ? classes.coursesDivMobile : classes.coursesDiv}
          >
            {this.getCourses()}
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

Courses.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  books: state.courses.books,
  courses: state.courses.courses,
  courses_error: state.courses.error,
  courses_fetched: state.courses.fetched,
  courses_fetching: state.courses.fetching,
  current_term: state.terms.current_term
})

const mapDispatchToProps = dispatch => {
  return {
    fetch_courses: current_term => dispatch(fetch_courses(current_term))
  }
}

export default withStyles(styles, { name: 'Courses' })(
  translate('view', { wait: true })(
    connect(mapStateToProps, mapDispatchToProps)(Courses)
  )
)
