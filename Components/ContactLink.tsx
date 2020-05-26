import React from 'react'
import styled from 'styled-components'
import EmailIcon from '../svgs/email.svg'
import GithubIcon from '../svgs/github.svg'
import InstagramIcon from '../svgs/instagram.svg'
import LinkedinIcon from '../svgs/linkedin.svg'

const Text = styled.div``

const Container = styled.a`
  display: grid;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  grid-template-columns: 2.2rem auto;
  grid-column-gap: 1.2rem;
  justify-content: start;

  & > svg {
    width: 2.2rem;
    height: 2.2rem;
  }

  &:hover > ${Text} {
    border-bottom: 0.2rem solid ${(props) => props.theme.colors.orange};
  }
`

export enum icons {
  github = 'github',
  email = 'email',
  linkedin = 'linkedin',
  instagram = 'instagram',
}

interface ContactLink {
  className?: string
  icon: icons
  url: string
  text: string
}

export const ContactLink = ({ className, url, text, icon }: ContactLink) => {
  const renderIcons = () => {
    switch (icon) {
      case icons.email:
        return <EmailIcon />
      case icons.github:
        return <GithubIcon />
      case icons.instagram:
        return <InstagramIcon />
      case icons.linkedin:
        return <LinkedinIcon />
      default:
        return null
    }
  }
  return (
    <Container className={className} href={url} target="_blank">
      {renderIcons()}
      <Text>{text}</Text>
    </Container>
  )
}
