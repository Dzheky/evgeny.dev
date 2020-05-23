import React from 'react'
import styled from 'styled-components'

interface Logo {
  className?: string
}

const Container = styled.div`
  font-size: 5.9rem;
`
const Evgeny = styled.div``
const Dev = styled.div``
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
