import React, { useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'

interface Projects {
  className?: string
}

const Container = styled.div`
  margin-top: 5rem;
  display: grid;
`

const Input = styled.input<{ isError?: boolean }>`
  border: 0.2rem solid
    ${(props) => {
      if (props.isError) {
        return props.theme.colors.red
      }
      return props.theme.colors.primary
    }};
  background-color: transparent;
  padding: 0.8rem 1.2rem;
  line-height: 1.2em;
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 0.7rem;
`

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.invert};
  border: none;
  font-size: 0.93rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 0.7rem;

  &:hover {
    opacity: 0.8;
  }

  & > svg {
    height: 3rem;
    width: auto;
  }
`

const sayHello = (name) => {
  if (!name) {
    return 'Hello human!'
  }

  return `Hello ${name}!`
}

const Form = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: minmax(15rem, 30rem) 10.7rem;
  grid-column-gap: 1rem;
`

const GreetingP = styled.p`
  font-size: 5rem;
  white-space: nowrap;
`

export const Greeting = () => {
  const [showGreeting, setShowGreeting] = useState(false)
  const [name, setName] = useState('')

  return (
    <Form>
      <Input
        value={name}
        id="greetings-input"
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="hello world"
      />
      <Button
        id="greetings-show-button"
        data-testid="show-greeting-button"
        onClick={() => setShowGreeting(true)}
      >
        Show Greeting
      </Button>
      <GreetingP id="greeting-text">{showGreeting && sayHello(name)}</GreetingP>
    </Form>
  )
}

const Projects = (props: Projects) => {
  return (
    <Container className={props.className}>
      <Head>
        <title>Greetings page</title>
      </Head>
      <Greeting />
    </Container>
  )
}

export default Projects
