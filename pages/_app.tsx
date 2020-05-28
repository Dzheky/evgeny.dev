import React, { useState } from 'react'
import { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Layout } from '../Containers/Layout'
import Normalize from '../styles/normalize.css'

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

const GlobalStyleWithTheme = createGlobalStyle`
  ${Normalize}
  * {
    box-sizing: border-box;
  }
  
  html {
    font-size: 10px;
    
    @media (max-width: 500px) {
      font-size: 9px;
    }
  }  
  body {
    width: 100vw;
    transition: background-color ease-in 200ms, color ease-in 200ms;
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.primary};
    font-family: 'Montserrat', sans-serif;
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
      <GlobalStyleWithTheme />
      <Layout darkTheme={chosenTheme === darkTheme} onThemeChange={handleThemeChange}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
