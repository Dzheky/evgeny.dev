import React from 'react'
import styled from 'styled-components'

interface Dashboard {
  className?: string
}

const Container = styled.div``

const Contacts = (props: Dashboard) => {
  return <Container className={props.className}>hello</Container>
}

export default Contacts
