import React, { ReactNode } from 'react'
import { Logo } from '../Components/Logo'
import styled from 'styled-components'

interface Layout {
  className?: string
  children: ReactNode
}

const Header = styled.div``
const Container = styled.div`
  font-size: 10px;
`

export const Layout = (props: Layout) => {
  return (
    <Container className={props.className}>
      <Header>
        <Logo />
      </Header>
      {props.children}
    </Container>
  )
}
