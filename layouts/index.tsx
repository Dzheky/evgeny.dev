import React, { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { FrontMatter } from '../interfaces/posts'
import { Img } from '../components/Img'
import FacebookIcon from '../svgs/socialMedia/facebookFilled.svg'
import LinkedinIcon from '../svgs/socialMedia/linkedinFilled.svg'
import TwitterIcon from '../svgs/socialMedia/twitterFilled.svg'
import { API_POINT } from '../constants/api'
import Subscribe from '../components/Subscribe'
import { NextSeo } from 'next-seo/lib'

interface Index {
  className?: string
  children: ReactNode
}

const Container = styled.div`
  margin-top: 2.5rem;
  width: 100%;
`

const PostImage = styled(Img)`
  width: 100%;
  height: 30rem;
  border-radius: 2.8rem;

  @media (max-width: 650px) {
    display: none;
  }
`

const Title = styled.h1`
  margin: 2.8rem auto 1.8rem auto;
  max-width: 70rem;
  font-size: 3.6rem;
  text-align: center;
  font-weight: bold;
  line-height: 4.4rem;
`

const Post = styled.article`
  margin: 3.8rem auto;
  font-family: 'Merriweather', serif;
  font-size: 1.4rem;
  line-height: 192%;
  max-width: 60rem;
`

const Time = styled.time`
  display: block;
  text-align: center;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};
  font-weight: 500;
`

const Footer = styled.footer`
  margin: 4.1rem auto 0 auto;
  max-width: 100rem;
  width: 100%;
`

const PostFooter = styled.footer`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  grid-gap: 1.9rem;
  align-items: center;

  @media (max-width: 620px) {
    grid-template-columns: auto;
  }
`

const Name = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: right;

  @media (max-width: 620px) {
    text-align: center;
  }
`

const SubName = styled.div`
  margin-top: 0.4rem;
  font-weight: normal;
  font-size: 1.4rem;
`

const ShareContainer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 620px) {
    align-items: center;
  }
`

const ShareIcons = styled.div`
  margin-top: 0.4rem;
  display: grid;
  justify-content: start;
  grid-template-columns: auto auto auto;
  grid-column-gap: 0.7rem;
`

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Avatar = styled(Img)`
  border-radius: 50%;
  width: 6.9rem;
  height: 6.9rem;
`

const IconButton = styled.a`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
`

const Index = (props: FrontMatter) => {
  const slug = props.__resourcePath.replace('posts/', '').replace('.mdx', '')
  return ({ children }: Index) => {
    useEffect(() => {
      fetch(`${API_POINT}api/increment?slug=${slug}`)
    }, [])

    return (
      <Container>
        <NextSeo
          title={props.title}
          description={props.summary}
          canonical="https://www.canonical.ie/"
          openGraph={{
            type: 'article',
            url: `https://evgeny.dev/posts/${slug}`,
            title: props.title,
            description: props.summary,
            images: [
              {
                url: props.imgSrc,
                width: 800,
                height: 600,
                alt: 'props.title',
              },
            ],
            site_name: 'Evgeny.DEV',
            article: {
              authors: ['Evgeny Klimenchenko'],
              publishedTime: props.publishedDate,
              section: 'Technology',
            },
          }}
          twitter={{
            handle: '@dzheky',
            cardType: 'summary_large_image',
          }}
        />
        <PostImage alt={`Image for post ${props.title}`} src={props.imgSrc} />
        <Title>{props.title}</Title>
        <Time dateTime={props.publishedDate}>
          {format(new Date(props.publishedDate), 'MMMM dd, yyyy')}
        </Time>
        <Post>{children}</Post>
        <PostFooter>
          <Name>
            Evgeny Klimenchenko
            <SubName>Software Engineer</SubName>
          </Name>
          <AvatarContainer>
            <Avatar alt="Evgeny Klimenchenko's avatar" src="/avatar.jpg" />
          </AvatarContainer>
          <ShareContainer>
            If you like please share
            <ShareIcons>
              <IconButton
                rel="noopener noreferrer"
                href={`http://twitter.com/share?url=https://evgeny.dev/posts/${slug}&hashtags=evgeny_dev`}
                target="_blank"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                rel="noopener noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://evgeny.dev/posts/${slug}`}
                target="_blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                rel="noopener noreferrer"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://evgeny.dev/posts/${slug}`}
                target="_blank"
              >
                <LinkedinIcon />
              </IconButton>
            </ShareIcons>
          </ShareContainer>
        </PostFooter>
        <Footer>
          <Subscribe slug={slug} />
        </Footer>
      </Container>
    )
  }
}

export default Index
