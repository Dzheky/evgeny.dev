import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Layout } from '../containers/Layout'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import Normalize from '../styles/normalize.css'
import DarkPrismCss from '../styles/darkprism'
import LightPrismCss from '../styles/lightprism'
import Head from 'next/head'

const theme = {
  colors: {
    primary: 'black',
    red: '#E32424',
    primaryRGB: '0, 0, 0',
    invert: 'white',
    invertRGB: '255, 255, 255',
    backgroundColor: 'white',
    backgroundColorRBG: '255, 255, 255',
    gray: '#C1B9B9',
    lightGray: '#f1f1f1',
    orange: '#F2994A',
  },
}

const darkTheme = {
  colors: {
    primary: 'white',
    red: '#E32424',
    primaryRGB: '255, 255, 255',
    invert: 'black',
    invertRGB: '0, 0, 0',
    backgroundColor: '#121212',
    backgroundColorRBG: '18, 18, 18',
    gray: '#C1B9B9',
    lightGray: '#686666',
    orange: '#F2994A',
  },
}

const Prism = createGlobalStyle<{ darkTheme?: boolean }>`
  ${(props) => (props.darkTheme ? DarkPrismCss : LightPrismCss)}
`

const GlobalStyleWithTheme = createGlobalStyle`
  ${Normalize}
  * {
    box-sizing: border-box;
    outline-color: ${(props) => props.theme.colors.orange};
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

const matched =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

const App = ({ Component, pageProps }: AppProps) => {
  const [chosenTheme, setTheme] = useState(matched ? darkTheme : theme)
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    if (chosenTheme === theme) {
      setTheme(darkTheme)
    } else {
      setTheme(theme)
    }
  }

  const body = (
    <ThemeProvider theme={chosenTheme}>
      <Head>
        <title>Blog posts</title>
      </Head>
      <DefaultSeo {...SEO} />
      <GlobalStyleWithTheme />
      <Prism darkTheme={chosenTheme === darkTheme} />
      <Layout darkTheme={chosenTheme === darkTheme} onThemeChange={handleThemeChange}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}

export default App
