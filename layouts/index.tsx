import React, { ReactNode } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { FrontMatter } from '../interfaces/posts'
import { Img } from '../components/Img'

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

const Index = (props: FrontMatter) => {
  console.log(props)
  return ({ children }: Index) => (
    <Container>
      <PostImage src={props.imgSrc} />
      <Title>{props.title}</Title>
      <Time dateTime={props.publishedDate}>
        {format(new Date(props.publishedDate), 'MMMM dd, yyyy')}
      </Time>
      <Post>{children}</Post>
    </Container>
  )
}

export default Index
