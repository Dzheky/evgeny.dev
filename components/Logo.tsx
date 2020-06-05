import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface Logo {
  className?: string
  scale?: boolean
  strip?: boolean
  showLastName?: boolean
  showAvatar?: boolean
}

const Container = styled.div<{ scale?: boolean }>`
  position: relative;
  display: flex;
  cursor: pointer;
  transition: transform ease-in-out 200ms;
  transform: ${(props) => (props.scale ? `scale(1.2)` : `scale(1)`)};
  align-items: flex-start;
  font-size: 3.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};

  @media (max-width: 850px) {
    transform: scale(1);
  }
`
const Name = styled.div<{ showAvatar?: boolean }>`
  position: relative;
  transition: transform linear 200ms;
  transform: ${(props) => (props.showAvatar ? `translateX(11.2rem)` : `translateX(0)`)};

  @media (max-width: 850px) {
    transform: translateX(0);
  }
`
const AvatarContainer = styled.div<{ showAvatar?: boolean }>`
  position: absolute;
  transition: all linear 200ms;
  transform: ${(props) => (props.showAvatar ? `translateX(0)` : `translateX(-11.2rem)`)};
  opacity: ${(props) => (props.showAvatar ? 1 : 0)};
  overflow: hidden;
  width: 9rem;
  height: 9rem;

  @media (max-width: 850px) {
    transform: translateX(0);
    opacity: 0;
  }
`
const Avatar = styled.img`
  border-radius: 1.5rem;
  width: 100%;
  height: 100%;
`
const Evgeny = styled.div``
const Dev = styled.span`
  user-select: none;
  font-size: 2.4rem;
  color: ${(props) => props.theme.colors.orange};
`
const Klimenchenko = styled.div<{ hide: boolean }>`
  position: absolute;
  transform: ${(props) => (props.hide ? 'translateY(-4.3rem)' : 'translateY(0)')};
  pointer-events: ${(props) => (props.hide ? 'none' : 'all')};
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: opacity linear 200ms, transform linear 200ms;
`

export const Logo = ({ className, showLastName, strip, showAvatar, scale }: Logo) => {
  return (
    <Link href="/">
      <Container className={className} scale={scale}>
        <Name showAvatar={showAvatar}>
          <Evgeny>
            Evgeny<Dev>.dev</Dev>
          </Evgeny>
          {!strip && <Klimenchenko hide={!showLastName}>Klimenchenko</Klimenchenko>}
        </Name>
        {!strip && (
          <AvatarContainer showAvatar={showAvatar}>
            <Avatar src="/avatar.jpg" />
          </AvatarContainer>
        )}
      </Container>
    </Link>
  )
}