import React, { useState } from 'react'
import styled from 'styled-components'
import MenuIcon from '../svgs/burger.svg'
import CloseIcon from '../svgs/close.svg'
import { Logo } from './Logo'
import Modal from './Modal'
import { API } from '../constants/api'
import Link from 'next/link'

const Container = styled.div`
  display: none;

  @media (max-width: 750px) {
    display: block;
  }
`

const MenuNav = styled.nav`
  display: grid;
  margin-top: 5rem;
  grid-template-columns: auto;
  grid-row-gap: 2.3rem;
  font-size: 3.5rem;
  font-weight: bold;
`

const IconButton = styled.button`
  cursor: pointer;
  outline: none;
  padding: 0;
  color: ${(props) => props.theme.colors.primary};
  background: transparent;
  border: none;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    color: ${(props) => props.theme.colors.orange};
  }

  & > svg {
    width: 2.9rem;
    height: 2.9rem;
  }
`

const MenuItem = styled.button<{ active?: boolean }>`
  font-weight: inherit;
  text-align: start;
  outline: none;
  border: none;
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};

  &:active {
    color: ${(props) => props.theme.colors.primary};
  }

  &:focus {
    color: ${(props) => props.theme.colors.orange};
  }
`

const MenuCurtain = styled.div<{ open: boolean }>`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  box-sizing: border-box;
  overflow-x: scroll;
  width: 100vw;
  height: 100vh;
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  transition: opacity ease-in-out 200ms;
  opacity: ${(props) => (props.open ? '1' : '0')};
  pointer-events: ${(props) => (props.open ? 'all' : 'none')};
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 0.5rem 3rem;
`

const MenuHeader = styled.div`
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:first-child > div:first-child {
    font-size: 3rem;
  }
`

interface MobileMenu {
  className?: string
}

export const MobileMenu = ({ className }: MobileMenu) => {
  const [open, setOpen] = useState(false)
  return (
    <Container className={className}>
      <Modal>
        <MenuCurtain open={open}>
          <MenuHeader>
            <Logo strip />
            <IconButton
              tabIndex={0}
              ref={(ref) => {
                ref?.focus()
              }}
              aria-label="Close menu"
              onClick={() => setOpen(!open)}
            >
              <CloseIcon />
            </IconButton>
          </MenuHeader>
          <MenuNav>
            <Link href={API.MAIN}>
              <MenuItem onClick={() => setOpen(false)}>about</MenuItem>
            </Link>
            <Link href={API.BLOG}>
              <MenuItem onClick={() => setOpen(false)}>blog</MenuItem>
            </Link>
            <Link href={API.PROJECTS}>
              <MenuItem onClick={() => setOpen(false)}>projects</MenuItem>
            </Link>
            <Link href={API.DASHBOARD}>
              <MenuItem onClick={() => setOpen(false)}>dashboard</MenuItem>
            </Link>
          </MenuNav>
        </MenuCurtain>
      </Modal>
      <IconButton aria-label="Open menu" onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
    </Container>
  )
}
