import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { Img } from './Img'
import Link from 'next/link'
import CSSTricksLogo from '../svgs/publishers/css-tricks.svg'
import LogRocketLogo from '../svgs/publishers/log-rocket.svg'
import { externalSources } from '../interfaces/posts'

const Container = styled.a`
  background-color: transparent;
  border: none;
  display: grid;
  color: inherit;
  text-decoration: none;
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

const PostTitle = styled.button`
  font-size: 2rem;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  text-align: start;
  border: none;
  padding: 0;
  outline: none;
  font-weight: 600;
  margin-bottom: 1.3rem;

  &:hover {
    color: ${(props) => props.theme.colors.orange};
  }

  &:focus {
    color: ${(props) => props.theme.colors.orange};
  }
`

const PostDescription = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1.3rem;
  line-height: 1.5em;
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
  grid-template-columns: auto 1fr auto auto;
  grid-column-gap: 1rem;
`

const PostDate = styled.div``

const PostTimeToRead = styled.div``

const PostViews = styled.div``

const LogoText = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
`

interface PostPreview {
  className?: string
  title: string
  slug?: string
  summary: string
  date: string
  url?: string
  timeToRead?: string
  views?: number
  publisher?: externalSources
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
  publisher,
  timeToRead,
  views,
  url,
}: PostPreview) => {
  const formattedDate = format(new Date(date), 'MMMM do, Y')

  const publisherLogo = (publisher?: externalSources) => {
    switch (publisher) {
      case externalSources.CSS_TRICKS:
        return <CSSTricksLogo />
      case externalSources.LOG_ROCKET:
        return <LogRocketLogo />
      default:
        return <LogoText>{publisher}</LogoText>
    }
  }

  const renderContent = () => (
    <Container
      className={className}
      href={url}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined}
    >
      {imgSrc && !noImage && <PostImg alt={`Image for post ${title}`} src={imgSrc} />}
      <PostMeta>
        <PostTitle tabIndex={0}>{title}</PostTitle>
        <PostDescription>{summary}</PostDescription>
        <PostFooter>
          <PostDate>{formattedDate}</PostDate>
          <PostTimeToRead>{timeToRead}</PostTimeToRead>
          {publisher ? (
            publisherLogo(publisher)
          ) : (
            <PostViews>
              views: {views !== undefined ? views : '-'}
              {` `}🔥
            </PostViews>
          )}
        </PostFooter>
      </PostMeta>
    </Container>
  )

  return publisher ? (
    renderContent()
  ) : (
    <Link href={`/posts/${slug}`}>{renderContent()}</Link>
  )
}
