import React, { useState } from 'react'
import { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Layout } from '../Containers/Layout'

const theme = {
  colors: {
    primary: 'black',
    backgroundColor: 'white',
    orange: '#F2994A',
  },
}

const darkTheme = {
  colors: {
    primary: 'white',
    backgroundColor: '#121212',
    orange: '#F2994A',
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    transition: background-color ease-in 200ms, color ease-in 200ms;
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.primary};
  }
`

const App = ({ Component, pageProps }: AppProps) => {
  const [chosenTheme, setTheme] = useState(theme)

  const handleThemeChange = () => {
    if (chosenTheme === theme) {
      setTheme(darkTheme)
    } else {
      setTheme(theme)
    }
  }

  return (
    <ThemeProvider theme={chosenTheme}>
      <GlobalStyle />
      <Layout darkTheme={chosenTheme === darkTheme} onThemeChange={handleThemeChange}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
