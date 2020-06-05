import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Text = styled.div`
  display: inline-block;
  font-size: 3.4rem;
  font-weight: bold;
  border-bottom: 0.4rem solid ${(props) => props.theme.colors.orange};
`

const TitleContainer = styled.div``

interface Title {
  className?: string
  children: ReactNode
}

export const Title = ({ className, children }: Title) => {
  return (
    <TitleContainer>
      <Text className={className}>{children}</Text>
    </TitleContainer>
  )
}