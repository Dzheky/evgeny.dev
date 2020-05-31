import React, { ReactNode } from 'react'
import { Logo } from '../Components/Logo'
import styled from 'styled-components'
import Menu from '../Components/Menu'
import { useRouter } from 'next/router'
import { API } from '../constants/api'
import MoonIcon from '../svgs/moon.svg'
import SunIcon from '../svgs/sun.svg'
import { MobileMenu } from '../Components/MobileMenu'
import { useScrollPosition } from '../utils/hoocks'

interface Layout {
  children: ReactNode
  darkTheme: boolean
  onThemeChange: () => void
}

const Header = styled.div<{ detach?: boolean }>`
  display: flex;
  padding: 1.5rem 3.8rem 1rem 3.8rem;
  position: sticky;
  top: -0.1rem;
  z-index: 2;
  transition: background-color ease-in 200ms;
  backdrop-filter: ${(props) => (props.detach ? `saturate(180%) blur(20px)` : 'none')};
  background-color: ${(props) =>
    props.detach ? `rgba(${props.theme.colors.backgroundColorRBG}, 0.8)` : 'transparent'};
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 500px) {
    padding: 1.5rem 3rem 1rem 3rem;
  }
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
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100rem;
`

const Container = styled.div`
  padding: 0 3.8rem;

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
      <Header detach={scrollPosition > 35}>
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
      <Container>{children}</Container>
    </CentralSection>
  )
}
