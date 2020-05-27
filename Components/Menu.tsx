import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { API } from '../Constants/api'
import { useRouter } from 'next/router'

interface Menu {
  className?: string
}

const ActiveUnderline = styled.div<{ element: DOMRect | null; left?: number }>`
  transition: all ease-in-out 200ms;
  width: ${(props) => (props.element ? `${props.element.width}px` : '0px')};
  left: ${(props) => (props.left ? `${props.left}px` : '0')};
  height: 0.5rem;
  top: 1.4em;
  background-color: ${(props) => props.theme.colors.orange};
  position: absolute;
`

const HoverUnderline = styled.div<{
  element: DOMRect | null
  left?: number
  hide?: boolean
}>`
  transition: width ease-in-out 100ms, left ease-in-out 100ms;
  width: ${(props) => (props.element ? `${props.element.width}px` : '0px')};
  left: ${(props) => (props.left ? `${props.left}px` : '0')};
  height: 0.5rem;
  top: 1.4em;
  background-color: ${(props) => props.theme.colors.orange};
  opacity: ${(props) => (!props.hide ? '0.3' : '0')};
  position: absolute;
`

const Container = styled.nav`
  position: relative;
  display: grid;
  grid-template-columns: auto auto auto auto;
  align-items: center;
  grid-gap: 1.8rem;
  font-size: 1.8rem;
  font-weight: bold;

  @media (max-width: 750px) {
    display: none;
  }
`
const MenuItem = styled.a<{ active?: boolean }>`
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};

  &:active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const Menu = (props: Menu) => {
  const router = useRouter()
  const [hoverElement, setHoverElement] = useState<HTMLAnchorElement | null>(null)
  const [activeElement, setActiveElement] = useState<HTMLAnchorElement | null>(null)
  const [hideHover, setHideHover] = useState(true)
  const blogRef = useRef<HTMLAnchorElement>()
  const homeRef = useRef<HTMLAnchorElement>()
  const projectsRef = useRef<HTMLAnchorElement>()
  const contactRef = useRef<HTMLAnchorElement>()

  useEffect(() => {
    if (blogRef.current && projectsRef.current && contactRef.current) {
      switch (router.route) {
        case API.MAIN:
          setActiveElement(homeRef.current)
          setHoverElement(homeRef.current)
          break
        case API.BLOG:
          setActiveElement(blogRef.current)
          setHoverElement(blogRef.current)
          break
        case API.PROJECTS:
          setActiveElement(projectsRef.current)
          setHoverElement(projectsRef.current)
          break
        case API.DASHBOARD:
          setActiveElement(contactRef.current)
          setHoverElement(contactRef.current)
          break
        default:
          setActiveElement(null)
          setHoverElement(null)
      }
    }
  }, [router.route])

  const handleHoverMenuItem = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    setHoverElement(event.target as HTMLAnchorElement)
    setHideHover(false)
  }

  const handleMouseLeave = () => {
    setHideHover(true)
  }

  return (
    <Container className={props.className} onMouseLeave={handleMouseLeave}>
      <ActiveUnderline
        element={activeElement?.getBoundingClientRect()}
        left={activeElement?.offsetLeft}
      />
      <HoverUnderline
        element={hoverElement?.getBoundingClientRect()}
        left={hoverElement?.offsetLeft}
        hide={hideHover}
      />
      <Link href={API.MAIN}>
        <MenuItem onMouseEnter={handleHoverMenuItem} ref={homeRef}>
          about
        </MenuItem>
      </Link>
      <Link href={API.BLOG}>
        <MenuItem onMouseEnter={handleHoverMenuItem} ref={blogRef}>
          blog
        </MenuItem>
      </Link>
      <Link href={API.PROJECTS}>
        <MenuItem onMouseEnter={handleHoverMenuItem} ref={projectsRef}>
          projects
        </MenuItem>
      </Link>
      <Link href={API.DASHBOARD}>
        <MenuItem onMouseEnter={handleHoverMenuItem} ref={contactRef}>
          dashboard
        </MenuItem>
      </Link>
    </Container>
  )
}

export default Menu
