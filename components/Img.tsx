import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.lightGray};
  width: 31.4rem;
  height: 23.4rem;
`

const Image = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 200ms ease-in-out;
`

interface Img {
  className?: string
  alt: string
  src: string
}

export const Img = ({ className, src, alt }: Img) => {
  const [loaded, setLoaded] = useState(false)
  const ImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ImgRef?.current?.complete) {
      setLoaded(true)
    } else {
      ImgRef.current.onload = () => {
        setLoaded(true)
      }
    }
  }, [ImgRef])

  return (
    <Container className={className}>
      <Image alt={alt} loaded={loaded} ref={ImgRef} src={src} />
    </Container>
  )
}
