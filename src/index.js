import 'typeface-arimo'

//import registerServiceWorker from "./registerServiceWorker"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import App from './App'
import { I18nextProvider } from 'react-i18next'
import { JssProvider } from 'react-jss'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { create } from 'jss'
import i18n from './utils/i18n'
import preset from 'jss-preset-default'
import store from './store'

/* eslint-disable no-self-compare */
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
     // Step 6.a: NaN == NaN
     return x !== x && y !== y;
    }
  };
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b89f74',
      main: '#877148',
      dark: '#58461f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#56a2ea',
      main: '#0074b7',
      dark: '#004987',
      contrastText: '#fff'
    }
  }
})

const root_element = "courses-root"
const jss = create(preset())

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <JssProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <App root_element={root_element} />
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  </I18nextProvider>,
  document.getElementById(root_element)
)
//registerServiceWorker()
