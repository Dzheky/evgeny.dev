import React from 'react'
import styled from 'styled-components'
import { frontMatter as blogPosts } from './posts/**/*.mdx'
import { Title } from '../components/Title'
import { PostPreview } from '../components/PostPreview'
import { FrontMatter } from '../interfaces/posts'

const Container = styled.div`
  justify-content: start;
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 3.8rem;
`

interface Blog {
  className?: string
}

const Blog = (props: Blog) => {
  let sortedBlogPosts = blogPosts.sort((first, second) =>
    new Date(first.publishedDate) < new Date(second.publishedDate) ? 1 : -1,
  )
  const recentPosts = sortedBlogPosts.slice(0, 3)
  sortedBlogPosts = sortedBlogPosts.slice(3)

  let year: number

  console.log(blogPosts)
  return (
    <Container className={props.className}>
      <Title>Latest</Title>
      {(recentPosts as FrontMatter[])?.map((post) => {
        return (
          <PostPreview
            key={post.title}
            date={post.publishedDate}
            imgSrc={post.imgSrc}
            title={post.title}
            views={10}
            timeToRead={post.readingTime.text}
            summary={post.summary}
          />
        )
      })}
      {sortedBlogPosts.map((post: FrontMatter) => {
        const postYear = new Date(post.publishedDate).getFullYear()
        if (postYear !== year) {
          year = postYear
          return (
            <>
              <Title>{year}</Title>
              <PostPreview
                key={post.title}
                noImage={true}
                date={post.publishedDate}
                imgSrc={post.imgSrc}
                title={post.title}
                views={10}
                timeToRead={post.readingTime.text}
                summary={post.summary}
              />
            </>
          )
        } else {
          return (
            <PostPreview
              key={post.title}
              noImage={true}
              date={post.publishedDate}
              imgSrc={post.imgSrc}
              title={post.title}
              views={10}
              timeToRead={post.readingTime.text}
              summary={post.summary}
            />
          )
        }
      })}
    </Container>
  )
}

export default Blog
