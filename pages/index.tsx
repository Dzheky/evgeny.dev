import React from 'react'
import styled from 'styled-components'
import { Title } from '../components/Title'
import { ContactLink, icons } from '../components/ContactLink'
import { Appear } from '../components/Appear'

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
      <Title>About</Title>
      <AboutBlock>
        Tempor in laboris non laborum quis. Ea cupidatat velit elit enim. Excepteur non
        reprehenderit ea aute sint cupidatat officia cillum. Proident do excepteur velit
        consectetur consequat incididunt aliqua officia eiusmod aliquip laboris ipsum
        commodo. <br />
        <br />
        Excepteur in quis elit qui proident laborum in excepteur. In esse ea deserunt
        aliqua cillum deserunt eiusmod sunt reprehenderit enim do ex enim.
      </AboutBlock>
      <Title>Contacts</Title>
      <Contacts>
        <ContactLink
          text="zklimenchenko@gmail.com"
          url="mailto:Zklimenchenko@gmail.com"
          icon={icons.email}
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
