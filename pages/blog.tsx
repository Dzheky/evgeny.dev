import React from 'react'
import styled from 'styled-components'
import { frontMatter as blogPosts } from './posts/**/*.mdx'
import { Title } from '../Components/Title'
import { PostPreview } from '../Components/PostPreview'
import { FrontMatter } from '../interfaces/posts'

const LatestPosts = styled.div`
  margin-top: 3.8rem;
  margin-bottom: 3.8rem;
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 3.8rem;
`

const Container = styled.div`
  margin-top: 2.5rem;
`

interface Blog {
  className?: string
}

const Blog = (props: Blog) => {
  console.log(blogPosts)
  return (
    <Container className={props.className}>
      <Title>Latest</Title>
      <LatestPosts>
        {(blogPosts as FrontMatter[])?.map((data, id) => {
          return (
            <PostPreview
              key={id}
              date={data.publishedDate}
              title={data.title}
              views={10}
              timeToRead={data.readingTime.text}
              summary={data.summary}
            />
          )
        })}
      </LatestPosts>
      <Title>2020</Title>
    </Container>
  )
}

export default Blog
