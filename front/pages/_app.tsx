import React from 'react'
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from './Theme'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <CssBaseline />
            <Component {...pageProps} />
          </StylesProvider>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
