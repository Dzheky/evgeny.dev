import React from 'react'
import styled from 'styled-components'

interface Blog {
  className?: string
}

const Container = styled.div``

const Blog = (props: Blog) => {
  return <Container className={props.className}>hello</Container>
}

export default Blog
