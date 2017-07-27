import React, { Component } from "react"
import CoursesTabs from "./components/CoursesTabs"
import AdvisingTabs from "./components/AdvisingTabs"
import ErrorMessages from "./components/ErrorMessages"
import { getTerms, getCourses } from "./api/api"
import { withStyles, createStyleSheet } from "material-ui/styles"
import { CircularProgress } from "material-ui/Progress"

/* global termsURL */
/* global coursesURL */
/* global calendarEventsURL */
/* global gpaAndCreditsURL */

const calendarObj = { url: calendarEventsURL, credentialsNeeded: true }

const styleSheet = createStyleSheet("CircularIndeterminate", theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },

  loading: {
    display: "flex",
    justifyContent: "center"
  }
}))

class App extends Component {
  state = {
    terms: null,
    currentTermBounds: [],
    currrentTerm: null,
    courses: null,
    width: document.getElementById(this.props.rootElement).clientWidth,
    mobile: false,
    advising: false,
    error: false,
    loading: true
  }

  updateWidth = () => {
    this.setState({
      width: document.getElementById(this.props.rootElement).clientWidth
    })
    if (this.state.width < 796) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth)
    if (document.getElementById(this.props.rootElement).clientWidth < 796) {
      this.setState({ mobile: true })
    }

    getTerms(termsURL)
      .then(terms => {
        if (!(terms instanceof Error)) {
          for (let i = 0, total = terms.length; i < total; i++) {
            if (Object.is(terms[i].current, "true")) {
              this.setState({
                currentTerm: terms[i],
                currentTermBounds: [
                  parseInt(terms[i].start, 10),
                  parseInt(terms[i].end, 10)
                ]
              })
            }
          }
          this.setState({ terms, loading: false })
        } else {
          this.setState({ error: true })
        }
      })
      .then(() => {
        getCourses(this.state.currentTerm, coursesURL).then(courses => {
          if (!(courses instanceof Error)) {
            this.setState({
              courses: courses.courses,
              advising: courses.advising
            })
          } else {
            this.setState({ error: true })
          }
        })
      })
  }

  updateTerm = currentTerm => {
    const termBounds = [
      parseInt(currentTerm.start, 10),
      parseInt(currentTerm.end, 10)
    ]
    getCourses(currentTerm, coursesURL).then(courses => {
      this.setState({ courses: courses.courses, advising: courses.advising, currentTermBounds: termBounds })
    })
  }

  getView = () => {
    const classes = this.props.classes
    if (Object.is(this.state.loading, true)) {
      return (
        <div className={classes.loading}>
          <CircularProgress
            color="accent"
            className={classes.progress}
            size={50}
          />
        </div>
      )
    } else if (
      Object.is(this.state.error, true) ||
      Object.is(this.state.terms, null) ||
      Object.is(this.state.currentTerm, null) ||
      Object.is(this.state.currentTerm, undefined)
    ) {
      return (
        <div className={classes.loading}>
          <ErrorMessages />
        </div>
      )
    } else if (!Object.is(this.state.courses, null) && !this.state.advising) {
      return (
        <div>
          <CoursesTabs
            courses={this.state.courses}
            mobile={this.state.mobile}
            rootElement={this.props.rootElement}
            calendarURL={calendarObj}
            termBounds={this.state.currentTermBounds}
            gradesURL={gpaAndCreditsURL}
            terms={this.state.terms}
            currentTermDescription={this.state.currentTerm.description}
            currentTermCode={this.state.currentTerm.code}
            updateTerm={this.updateTerm}
          />
        </div>
      )
    } else {
      if (!this.state.advising) {
        return (
          <div>
            <CoursesTabs
              courses={this.state.courses}
              mobile={this.state.mobile}
              gradesURL={gpaAndCreditsURL}
              calendarURL={calendarObj}
              rootElement={this.props.rootElement}
              termBounds={this.state.currentTermBounds}
              terms={this.state.terms}
              currentTermDescription={this.state.currentTerm.description}
              currentTermCode={this.state.currentTerm.code}
              updateTerm={this.updateTerm}
            />
          </div>
        )
      } else {
        return (
          <div>
            <AdvisingTabs
              courses={this.state.courses}
              mobile={this.state.mobile}
              gradesURL={gpaAndCreditsURL}
              calendarURL={calendarObj}
              rootElement={this.props.rootElement}
              termBounds={this.state.currentTermBounds}
              terms={this.state.terms}
              currentTermDescription={this.state.currentTerm.description}
              currentTermCode={this.state.currentTerm.code}
              updateTerm={this.updateTerm}
            />
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.getView()}
      </div>
    )
  }
}

export default withStyles(styleSheet)(App)
