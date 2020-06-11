import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface TextFlip {
  className?: string
  text: string
}

const moveDown = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(1.2em);
  }
`

const Animate = css`
  animation: ${moveDown} 300ms ease-in-out;
`

const Container = styled.div`
  height: 1.2em;
  position: relative;
  display: inline-block;
`

const Flipper = styled.div`
  font-family: monospace;
  font-weight: 300;
  pointer-events: none;
  position: absolute;
  left: 0;
  width: 15rem;
  display: inline-block;
  overflow: hidden;
`

const NewText = styled.div<{ animate: boolean }>`
  ${(props) => (props.animate ? Animate : '')};
  position: absolute;
  height: 1em;
  top: -1.2em;
`

const OldText = styled.div<{ animate: boolean }>`
  ${(props) => (props.animate ? Animate : '')};
  height: 1em;
`

const TextFlip = ({ text, className }: TextFlip) => {
  const [currentRoute, setCurrentRoute] = useState('')
  const [newRoute, setNewRoute] = useState('')

  useEffect(() => {
    Flip(text)
  }, [text])

  const Flip = (text: string) => {
    setNewRoute(text)
    return setTimeout(() => {
      setCurrentRoute(text)
    }, 290)
  }

  return (
    <Container className={className}>
      <Flipper>
        <NewText animate={currentRoute !== newRoute}>{newRoute}</NewText>
        <OldText animate={currentRoute !== newRoute}>{currentRoute}</OldText>
      </Flipper>
    </Container>
  )
}

export default TextFlip
