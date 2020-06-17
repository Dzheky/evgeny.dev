import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'

interface NotFound {
  className?: string
}

const Container = styled.div`
  margin-top: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ShrugEmoji = styled.div`
  font-size: 10rem;
  @media (max-width: 400px) {
    font-size: 7rem;
  }
`

const ForeOFore = styled.div`
  font-size: 15rem;
  font-weight: bold;
  @media (max-width: 400px) {
    font-size: 12rem;
  }
`

const SubTitle = styled.div`
  text-align: center;
  font-size: 3rem;
  @media (max-width: 400px) {
    font-size: 2rem;
  }
`

const NotFound = (props: NotFound) => {
  return (
    <Container className={props.className}>
      <Head>
        <title>404</title>
      </Head>
      <ShrugEmoji>🤷‍♂️</ShrugEmoji>
      <ForeOFore>404</ForeOFore>
      <SubTitle>This page is not found</SubTitle>
    </Container>
  )
}

export default NotFound
