import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: none;

  @media (max-width: 750px) {
    display: block;
  }
`

interface MobileMenu {
  className?: string
}

export const MobileMenu = ({ className }: MobileMenu) => {
  return <Container className={className}>Hello</Container>
}
