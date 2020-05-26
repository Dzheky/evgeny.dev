import React from 'react'
import styled from 'styled-components'
import { frontMatter as blogPosts } from './posts/**/*.mdx'
import GhostContentAPI from '@tryghost/content-api'
import { Title } from '../Components/Title'

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

const Container = styled.div`
  margin-top: 11rem;
  padding-left: 11.8rem;
`

const Index = () => {
  console.log(blogPosts)
  getPosts()
  return (
    <Container>
      <Title>About</Title>
    </Container>
  )
}

export default Index
