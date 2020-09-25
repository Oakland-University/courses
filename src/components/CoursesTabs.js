import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Courses from './Courses'
import Info from '@material-ui/icons/Info'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import TermSelect from './TermSelect'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { is_off_campus } from '../utils/offCampus'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core'

const TabContainer = (props) => <div style={{ padding: 20 }}>{props.children}</div>

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const useStyles = makeStyles(() => ({
  root: {
    minHeight: 0,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  tab: {
    '@media (min-width: 1024px)': {
      minWidth: 72,
    },
  },
  flex: {
    flex: 1,
  },
  button: {
    color: '#FFFFFF',
  },
  bar: {
    flexDirection: 'column',
  },
  btnContainer: {
    display: 'flex',
  },
  infoCard: {
    marginTop: 20,
    borderLeft: '10px solid #31708F',
  },
  header: {
    borderBottom: '1px solid #d3d3d3',
    borderRadius: 0,
    boxShadow: 'none',
    padding: '10px',
  },
  icon: {
    color: '#31708F',
    fontSize: 32,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  sampleColor: {
    height: '15px',
    width: '15px',
    backgroundColor: '#D79873',
    alignSelf: 'center',
    borderRadius: '2px',
    paddingLeft: '6px',
    paddingRight: '6px',
  },
}))

const OffCampus = ({ classes }) => {
  return (
    <Card className={classes.infoCard}>
      <CardHeader
        className={classes.header}
        classes={{
          title: classes.headerContent,
        }}
        avatar={<Info className={classes.icon} />}
        title={
          <div className={classes.headerContent}>
              <Typography>
                Courses not taken at the main campus will now appear as this color: &nbsp;
                <span className={classes.sampleColor} />
              </Typography>
              <Typography>
                The location of a course can be found in the first field under Class Information.
              </Typography>
          </div>
        }
      />
    </Card>
  )
}

const MultipleMeetings = ({ classes }) => {
  return (
    <Card className={classes.infoCard}>
      <CardHeader
        className={classes.header}
        classes={{
          title: classes.headerContent,
        }}
        avatar={<Info className={classes.icon} />}
        title={
          <div className={classes.headerContent}>
            <Typography>
              {' '}
              <strong>Note: </strong>Your course may have multiple meeting times. Please click the
              down arrow listed next to the meeting time to view the full course schedule.
            </Typography>
          </div>
        }
      />
    </Card>
  )
}

const UpdateInfo = ({ classes }) => {
  return (
    <Card className={classes.infoCard}>
      <CardHeader
        className={classes.header}
        classes={{
          title: classes.headerContent,
        }}
        avatar={<Info className={classes.icon} />}
        title={
          <div className={classes.headerContent}>
            <Typography>
              {' '}
              <strong>Note: </strong>If your course information is incorrect, please contact your department chair.
            </Typography>
          </div>
        }
      />
    </Card>
  )
}

export default function CoursesTabs() {
  const [value, setValue] = useState(0)
  const courses = useSelector((state) => state.courses)
  const selected_term = useSelector((state) => state.selected_term)
  const courses_fetched = useSelector((state) => state.fetched)
  const courses_error = useSelector((state) => state.error)
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))
  const off_campus = courses.some((course) =>
    course.meetings.some((meeting) => is_off_campus(meeting.campus))
  )
  const multiple_meetings = courses.some((course) => course.meetings.length > 1)

  return (
    <Paper>
      <AppBar position='static'>
        <Toolbar disableGutters={true} className={mobile ? classes.bar : classes.root}>
          <TermSelect />
        </Toolbar>
      </AppBar>
        <TabContainer>
          {courses_fetched && !courses_error && courses.length !== 0 && (
            <>
              {off_campus && <OffCampus classes={classes} />}
              {multiple_meetings && <MultipleMeetings classes={classes} />}
              {<UpdateInfo classes={classes}/>}
            </>
          )}
          <Courses tabIndex='0' mobile={mobile} />
        </TabContainer>
    </Paper>
  )
}
