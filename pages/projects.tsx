import React from 'react'
import styled from 'styled-components'

interface Projects {
  className?: string
}

const Container = styled.div``

const Projects = (props: Projects) => {
  return <Container className={props.className}>hello world</Container>
}

export default Projects
