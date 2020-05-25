import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface Logo {
  className?: string
  showLastName?: boolean
  showAvatar?: boolean
}

const Container = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: flex-start;
  font-size: 3.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`
const Name = styled.div<{ showAvatar?: boolean }>`
  position: relative;
  transition: transform linear 200ms;
  transform: ${(props) => (props.showAvatar ? `translateX(11.2rem)` : `translateX(0)`)};
`
const AvatarContainer = styled.div<{ showAvatar?: boolean }>`
  position: absolute;
  transition: all linear 200ms;
  transform: ${(props) => (props.showAvatar ? `translateX(0)` : `translateX(-11.2rem)`)};
  opacity: ${(props) => (props.showAvatar ? 1 : 0)};
  overflow: hidden;
  width: 9rem;
  height: 9rem;
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
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: all linear 200ms;
`

export const Logo = ({ className, showLastName, showAvatar }: Logo) => {
  return (
    <Link href="/">
      <Container className={className}>
        <Name showAvatar={showAvatar}>
          <Evgeny>
            Evgeny<Dev>.dev</Dev>
          </Evgeny>
          <Klimenchenko hide={!showLastName}>Klimenchenko</Klimenchenko>
        </Name>
        <AvatarContainer showAvatar={showAvatar}>
          <Avatar src="/avatar.jpg" />
        </AvatarContainer>
      </Container>
    </Link>
  )
}
