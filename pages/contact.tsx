import React from 'react'
import styled from 'styled-components'

interface Contact {
  className?: string
}

const Container = styled.div``

const Contacts = (props: Contact) => {
  return <Container className={props.className}>hello</Container>
}

export default Contacts
