import React from 'react'
import styled from 'styled-components'

const Container = styled.div``

const PostMeta = styled.div``

const PostTitle = styled.div``

const PostDescription = styled.div``

interface PostPreview {
  className?: string
  title: string
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
  imgSrc,
  title,
  summary,
  date,
  timeToRead,
  views,
}: PostPreview) => {
  return (
    <Container className={className}>
      <PostMeta>
        <PostTitle>{title}</PostTitle>
        <PostDescription>{summary}</PostDescription>
      </PostMeta>
    </Container>
  )
}
