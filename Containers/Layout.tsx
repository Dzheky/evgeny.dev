import React, { ReactNode } from 'react'
import { Logo } from '../Components/Logo'
import styled from 'styled-components'
import Menu from '../Components/Menu'

interface Layout {
  children: ReactNode
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
  return (
    <Container>
      <Header>
        <Logo />
        <Menu />
      </Header>
      {props.children}
    </Container>
  )
}
