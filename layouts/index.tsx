import React, { ReactNode } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { FrontMatter } from '../interfaces/posts'
import { Img } from '../components/Img'
import FacebookIcon from '../svgs/facebookFilled.svg'
import LinkedinIcon from '../svgs/linkedinFilled.svg'
import TwitterIcon from '../svgs/twitterFilled.svg'

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

const PostFooter = styled.footer`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  grid-gap: 1.9rem;
  align-items: center;
`

const Name = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: right;
`

const SubName = styled.div`
  margin-top: 0.4rem;
  font-weight: normal;
  font-size: 1.4rem;
`

const ShareContainer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`

const ShareIcons = styled.div`
  margin-top: 0.4rem;
  display: grid;
  justify-content: start;
  grid-template-columns: auto auto auto;
  grid-column-gap: 0.7rem;
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
  return ({ children }: Index) => (
    <Container>
      <PostImage src={props.imgSrc} />
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
        <Avatar src="/avatar.jpg" />
        <ShareContainer>
          If you like please share
          <ShareIcons>
            <IconButton
              href={`http://twitter.com/share?url=https://evgeny.dev/posts/${slug}&hashtags=evgeny_dev`}
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href={`https://www.facebook.com/sharer/sharer.php?u=https://evgeny.dev/posts/${slug}`}
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://evgeny.dev/posts/${slug}`}
              target="_blank"
            >
              <LinkedinIcon />
            </IconButton>
          </ShareIcons>
        </ShareContainer>
      </PostFooter>
    </Container>
  )
}

export default Index
