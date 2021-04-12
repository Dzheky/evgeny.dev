import React from 'react'
import styled from 'styled-components'
import { H1 } from '../components/H1'
import { ContactLink, icons } from '../components/ContactLink'
import { Appear } from '../components/Appear'
import Head from 'next/head'

const Container = styled(Appear)`
  transition: padding ease-in 200ms;
  padding: 11rem 0 0 11.8rem;

  @media (max-width: 850px) {
    padding: 7rem 0 0 0;
  }
`

const AboutBlock = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 150%;
  max-width: 66rem;
  margin-bottom: 3.4rem;
`

const Contacts = styled.div`
  margin-top: 2.5rem;
  justify-content: start;
  display: grid;
  grid-row-gap: 1.5rem;
`

const Index = () => {
  return (
    <Container>
      <Head>
        <title>About page</title>
      </Head>
      <H1>About</H1>
      <AboutBlock>
        Hey, I am Evgeny Klimenchenko, Software Engineer, writer and photographer living
        in London, UK.
        <br />
        <br />
        Welcome to my website! Here you will find everything about me.
      </AboutBlock>
      <H1>Contacts</H1>
      <Contacts>
        <ContactLink
          text="zklimenchenko@gmail.com"
          url="mailto:Zklimenchenko@gmail.com"
          icon={icons.email}
        />
        <ContactLink
          text="twitter.com/dzheky"
          url="https://twitter.com/dzheky"
          icon={icons.twitter}
        />
        <ContactLink
          text="github.com/dzheky"
          url="https://github.com/dzheky"
          icon={icons.github}
        />
        <ContactLink
          text="linkedin.com/in/kevgeny/"
          url="https://linkedin.com/in/kevgeny/"
          icon={icons.linkedin}
        />
        <ContactLink
          text="instagram.com/kevgeny/"
          url="https://instagram.com/kevgeny/"
          icon={icons.instagram}
        />
      </Contacts>
    </Container>
  )
}

export default Index
