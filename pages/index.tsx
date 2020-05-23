import React from 'react'
import styled from 'styled-components'
import { frontMatter as blogPosts } from '../posts/**/*.mdx'
import GhostContentAPI from '@tryghost/content-api'

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

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Index = () => {
  console.log(blogPosts)
  getPosts()
  return <Title>My page</Title>
}

export default Index
