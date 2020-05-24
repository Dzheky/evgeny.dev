import React, { ReactNode } from 'react'
import { Logo } from '../Components/Logo'
import styled from 'styled-components'
import Menu from '../Components/Menu'
import { useRouter } from 'next/router'

interface Layout {
  children: ReactNode
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Container = styled.div`
  padding-left: 3.8rem;
  padding-right: 3.8rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 92rem;
  font-family: 'Montserrat', sans-serif;
`

export const Layout = (props: Layout) => {
  const router = useRouter()
  const isLastNameVisible = router.route === '/'
  const isAvatarVisible = router.route === '/'
  return (
    <Container>
      <Header>
        <Logo showLastName={isLastNameVisible} showAvatar={isAvatarVisible} />
        <Menu />
      </Header>
      {props.children}
    </Container>
  )
}
