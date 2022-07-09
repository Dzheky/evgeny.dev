import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const SurveyComponent = dynamic(
  () => import('../components/SurveyComponent/SurveyComponent'),
  {
    ssr: false,
  },
)

interface Projects {
  className?: string
}

const Container = styled.div`
  margin-top: 2.5rem;
`

const Projects = (props: Projects) => {
  return (
    <Container className={props.className}>
      <Head>
        <title>First Programming Language</title>
      </Head>
      <SurveyComponent />
    </Container>
  )
}

export default Projects
