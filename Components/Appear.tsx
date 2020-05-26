import React, { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Container = styled.div`
  opacity: 0;
  animation: ${appearAnimation} 200ms ease-in forwards;
`

interface Appear {
  className?: string
  children: ReactNode
}

export const Appear = ({ className, children }: Appear) => {
  return <Container className={className}>{children}</Container>
}
