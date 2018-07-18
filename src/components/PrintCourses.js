import React from 'react'

import PrintIcon from '@material-ui/icons/Print'
import Button from '@material-ui/core/Button'
import { get_pdf } from '../api/api'

/* global print_url */

const mobileStyle = {
  margin: 'auto'
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
    </div>
  )
}

const handlePrint = (term) => {
  const url = get_pdf(term, print_url).then(u => {
    window.open(u)
  })
}
