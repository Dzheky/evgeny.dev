import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Subscribe from '../components/Subscribe'

interface SubscribeProps {
  className?: string
}

const Container = styled.div`
  margin-top: 2.5rem;
`

const SubscribePage = (props: SubscribeProps) => {
  return (
    <Container className={props.className}>
      <Head>
        <title>Subscription page</title>
      </Head>
      <Subscribe slug="subscribe" title="Subscribe to my newsletter!" />
    </Container>
  )
}

export default SubscribePage
