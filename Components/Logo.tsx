import React from 'react'
import styled from 'styled-components'

interface Logo {
  className?: string
}

const Container = styled.div`
  font-size: 3.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`
const Evgeny = styled.div``
const Dev = styled.span`
  font-size: 2.4rem;
  color: ${(props) => props.theme.colors.orange};
`
const Klimenchenko = styled.div``

export const Logo = (props: Logo) => {
  return (
    <Container className={props.className}>
      <Evgeny>
        Evgeny<Dev>.dev</Dev>
      </Evgeny>
      <Klimenchenko>Klimenchenko</Klimenchenko>
    </Container>
  )
}
