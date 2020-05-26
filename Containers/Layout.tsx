import React, { ReactNode } from 'react'
import { Logo } from '../Components/Logo'
import styled from 'styled-components'
import Menu from '../Components/Menu'
import { useRouter } from 'next/router'
import { API } from '../Constants/api'

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
  padding: 1.5rem 3.8rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100rem;
  font-family: 'Montserrat', sans-serif;
`

export const Layout = (props: Layout) => {
  const router = useRouter()
  const isLastNameVisible = router.route === API.MAIN
  const isScaledLogo = router.route === API.MAIN
  const isAvatarVisible = router.route === API.MAIN
  return (
    <Container>
      <Header>
        <Logo showLastName={isLastNameVisible} showAvatar={isAvatarVisible} scale={isScaledLogo} />
        <Menu />
      </Header>
      {props.children}
    </Container>
  )
}
