import React from 'react'

import PrintIcon from '@material-ui/icons/Print'
import Button from '@material-ui/core/Button'

/* global print_url */

const mobileStyle = {
  marginLeft: '1em'
}

const style = {
  marginLeft: '1em'
}

export const getPrintButton = (term, mobile, rightIconStyle) => {
  return (
    <div style={mobile ? mobileStyle : style}>
      <Button
        color="secondary"
        title="Print Courses"
        variant="raised"
        tabIndex="0"
        onClick={() => handlePrint(term)}
      >
        Print Courses
        <PrintIcon className={rightIconStyle} />
      </Button>
      <form
        name="PrintCoursesForm"
        method="post"
        target="_blank"
        rel="noopener noreferrer"
        action={print_url}
        aria-describedby="download"
        hidden
      >
        <input type="hidden" name="code" value={term.code}/>
        <input type="hidden" name="current" value="random nonsense" />
        <input type="hidden" name="description" value={term.description} />
        <input type="hidden" name="start" value={term.start} />
        <input type="hidden" name="end" value={term.end} />
        <button
          className="courses-portlet-print-form"
          id="courses-portlet-print-form"
          type="submit"
        />
      </form>
    </div>
  )
}

const handlePrint = () => {
  document.getElementById('courses-portlet-print-form').click()
}

