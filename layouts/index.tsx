import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div``

const Index = (frontMatter: any) => {
  return ({ children }: { children: ReactNode }) => {
    return <Container>{children}</Container>
  }
}

export default Index
