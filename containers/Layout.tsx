import React, { ReactNode } from 'react'
import { Logo } from '../components/Logo'
import styled from 'styled-components'
import Menu from '../components/Menu'
import { useRouter } from 'next/router'
import { API } from '../constants/api'
import MoonIcon from '../svgs/moon.svg'
import SunIcon from '../svgs/sun.svg'
import { MobileMenu } from '../components/MobileMenu'
import { useScrollPosition } from '../utils/hoocks'

interface Layout {
  children: ReactNode
  darkTheme: boolean
  onThemeChange: () => void
}

const FullHeader = styled.div<{ detach?: boolean }>`
  width: 100%;
  position: sticky;
  display: flex;
  justify-content: center;
  top: -0.1rem;
  z-index: 2;
  transition: background-color ease-in 200ms;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: ${(props) => `rgba(${props.theme.colors.backgroundColorRBG}, 0.8)`};
`

const Header = styled.div`
  display: flex;
  padding: 1.5rem 3.8rem 1rem 3.8rem;
  justify-content: space-between;
  align-items: center;
  max-width: 100rem;
  width: 100%;

  @media (max-width: 500px) {
    padding: 1.5rem 3rem 1rem 3rem;
  }
`

const MenuContainer = styled.div`
  padding-top: 1rem;
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
  min-height: 100vh;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const BottomPadding = styled.div`
  width: 100%;
  height: 3rem;
`

const Container = styled.div`
  max-width: 100rem;
  width: 100%;
  flex-grow: 1;
  padding: 0 3.8rem;
  margin: 0 auto;

  @media (max-width: 500px) {
    padding: 0 3rem;
  }
`

export const Layout = ({ children, darkTheme, onThemeChange }: Layout) => {
  const scrollPosition = useScrollPosition()
  const router = useRouter()
  const isLastNameVisible = router.route === API.MAIN
  const isScaledLogo = router.route === API.MAIN
  const isAvatarVisible = router.route === API.MAIN

  return (
    <CentralSection>
      <FullHeader detach={scrollPosition > 35}>
        <Header>
          <Logo
            showLastName={isLastNameVisible && scrollPosition < 35}
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
      </FullHeader>
      <Container>{children}</Container>
      <BottomPadding />
    </CentralSection>
  )
}
