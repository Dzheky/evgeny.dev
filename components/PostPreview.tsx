import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { Img } from './Img'
import Link from 'next/link'

const Container = styled.div`
  display: grid;
  cursor: pointer;
  justify-content: start;
  grid-template-columns: auto 1fr;
  grid-column-gap: 2.5rem;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`

const PostMeta = styled.div`
  max-width: 46rem;
  padding: 0.5rem 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const PostTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.3rem;
`

const PostDescription = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1.3rem;
  opacity: 0.5;
`

const PostImg = styled(Img)`
  width: 14.7rem;
  height: 11.8rem;
  border-radius: 1.5rem;

  @media (max-width: 650px) {
    display: none;
  }
`

const PostFooter = styled.div`
  font-size: 1.1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 1rem;
`

const PostDate = styled.div``

const PostTimeToRead = styled.div``

const PostViews = styled.div``

interface PostPreview {
  className?: string
  title: string
  slug: string
  summary: string
  date: string
  timeToRead: string
  views: number
  imgSrc?: string
  noImage?: boolean
}

export const PostPreview = ({
  className,
  noImage,
  slug,
  imgSrc,
  title,
  summary,
  date,
  timeToRead,
  views,
}: PostPreview) => {
  const formattedDate = format(new Date(date), 'MMMM do, Y')
  return (
    <Link href={`/posts/${slug}`}>
      <Container className={className}>
        {imgSrc && !noImage && <PostImg src={imgSrc} />}
        <PostMeta>
          <PostTitle>{title}</PostTitle>
          <PostDescription>{summary}</PostDescription>
          <PostFooter>
            <PostDate>{formattedDate}</PostDate>
            <PostTimeToRead>{timeToRead}</PostTimeToRead>
            <PostViews>views: {views}</PostViews>
          </PostFooter>
        </PostMeta>
      </Container>
    </Link>
  )
}
