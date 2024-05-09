import React from 'react'
import styled from 'styled-components'
import EmailIcon from '../svgs/socialMedia/email'
import GithubIcon from '../svgs/socialMedia/github'
import InstagramIcon from '../svgs/socialMedia/instagram'
import TwitterIcon from '../svgs/socialMedia/twitter'
import LinkedinIcon from '../svgs/socialMedia/linkedin'

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
  twitter = 'twitter',
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
      case icons.twitter:
        return <TwitterIcon />
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
    <Container rel="noopener noreferrer" className={className} href={url} target="_blank">
      {renderIcons()}
      <Text>{text}</Text>
    </Container>
  )
}
