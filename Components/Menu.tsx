import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface Menu {
  className?: string
}

const Container = styled.nav`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  height: 6rem;
  grid-gap: 1.8rem;
  font-size: 1.8rem;
  font-weight: bold;
`
const MenuItem = styled.a<{ active?: boolean }>`
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};

  &:active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const Menu = (props: Menu) => {
  return (
    <Container className={props.className}>
      <Link href="/">
        <MenuItem>blog</MenuItem>
      </Link>
      <Link href="/">
        <MenuItem>projects</MenuItem>
      </Link>
      <Link href="/">
        <MenuItem>contact</MenuItem>
      </Link>
    </Container>
  )
}

export default Menu
