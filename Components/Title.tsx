import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  font-size: 3.4rem;
  font-weight: bold;
  border-bottom: 0.4rem solid ${(props) => props.theme.colors.orange};
`

interface Title {
  className?: string
  children: string
}

export const Title = ({ className, children }: Title) => {
  return <Container className={className}>{children}</Container>
}
