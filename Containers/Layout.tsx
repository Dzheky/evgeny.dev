import React, { ReactNode } from 'react'
import { Logo } from '../Components/Logo'
import styled from 'styled-components'

interface Layout {
  children: ReactNode
}

const Header = styled.div``
const Container = styled.div`
  font-size: 10px;
  font-family: 'Montserrat', sans-serif;
`

export const Layout = (props: Layout) => {
  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      {props.children}
    </Container>
  )
}
