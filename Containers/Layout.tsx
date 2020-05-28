import React, { ReactNode } from 'react'
import { Logo } from '../Components/Logo'
import styled from 'styled-components'
import Menu from '../Components/Menu'
import { useRouter } from 'next/router'
import { API } from '../constants/api'
import MoonIcon from '../svgs/moon.svg'
import SunIcon from '../svgs/sun.svg'
import { MobileMenu } from '../Components/MobileMenu'

interface Layout {
  children: ReactNode
  darkTheme: boolean
  onThemeChange: () => void
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-column-gap: 1.8rem;
`
const IconButton = styled.button`
  cursor: pointer;
  outline: none;
  background: transparent;
  border: none;

  &:hover {
    opacity: 0.8;
  }

  & > svg {
    width: 1.9rem;
    height: 1.9rem;
  }
`
const CentralSection = styled.div`
  padding: 1.5rem 3.8rem;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100rem;

  @media (max-width: 500px) {
    padding: 1.5rem 3rem;
  }
`

export const Layout = ({ children, darkTheme, onThemeChange }: Layout) => {
  const router = useRouter()
  const isLastNameVisible = router.route === API.MAIN
  const isScaledLogo = router.route === API.MAIN
  const isAvatarVisible = router.route === API.MAIN
  return (
    <CentralSection>
      <Header>
        <Logo
          showLastName={isLastNameVisible}
          showAvatar={isAvatarVisible}
          scale={isScaledLogo}
        />
        <MenuContainer>
          <Menu />
          <IconButton onClick={onThemeChange}>
            {darkTheme ? <SunIcon /> : <MoonIcon />}
          </IconButton>
          <MobileMenu />
        </MenuContainer>
      </Header>
      {children}
    </CentralSection>
  )
}
