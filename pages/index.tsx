import React from 'react'
import styled from 'styled-components'
import { frontMatter as blogPosts } from './posts/**/*.mdx'
import GhostContentAPI from '@tryghost/content-api'
import { Title } from '../Components/Title'
import { ContactLink, icons } from '../Components/ContactLink'
import { Appear } from '../Components/Appear'

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://ghost.evgeny.dev',
  key: 'f84895b09f5b555c1661372509',
  version: 'v3',
})

export async function getPosts() {
  const result = await api.posts
    .browse({
      limit: 'all',
    })
    .catch((err) => {
      console.error(err)
    })
}

const Container = styled(Appear)`
  transition: transform ease-in 200ms;
  transform: translate(11.8rem, 11rem);

  @media (max-width: 850px) {
    transform: translate(0, 7rem);
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
  display: grid;
  grid-row-gap: 1.5rem;
`

const Index = () => {
  console.log(blogPosts)
  getPosts()
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
