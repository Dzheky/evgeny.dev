import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { frontMatter as blogPosts } from './posts/**/*.mdx'
import { H1 } from '../components/H1'
import { PostPreview } from '../components/PostPreview'
import { FrontMatter } from '../interfaces/posts'
import { API_POINT } from '../constants/api'

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
  const [views, setViews] = useState()
  useEffect(() => {
    fetchViews()
  }, [])

  const fetchViews = async () => {
    const result = await fetch(`${API_POINT}api/post_views`)
    if (result.ok) {
      const data = await result.json()
      if (data.posts) {
        setViews(data.posts)
      }
    }
  }

  let sortedBlogPosts = blogPosts.sort((first, second) =>
    new Date(first.publishedDate) < new Date(second.publishedDate) ? 1 : -1,
  )
  const recentPosts = sortedBlogPosts.slice(0, 3)
  sortedBlogPosts = sortedBlogPosts.slice(3)

  let year: number

  return (
    <Container className={props.className}>
      <H1>Latest</H1>
      {(recentPosts as FrontMatter[])?.map((post) => {
        const slug = post.__resourcePath.replace('posts/', '').replace('.mdx', '')
        return (
          <PostPreview
            slug={slug}
            key={post.title}
            date={post.publishedDate}
            imgSrc={post.imgSrc}
            title={post.title}
            views={views ? get(views, slug, 0) : undefined}
            timeToRead={post.readingTime.text}
            summary={post.summary}
          />
        )
      })}
      {sortedBlogPosts.map((post: FrontMatter) => {
        const slug = post.__resourcePath.replace('posts/', '').replace('.mdx', '')
        const postYear = new Date(post.publishedDate).getFullYear()
        if (postYear !== year) {
          year = postYear
          return (
            <>
              <H1>{year}</H1>
              <PostPreview
                slug={slug}
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
              slug={slug}
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
