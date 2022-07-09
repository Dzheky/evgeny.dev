import React, { SyntheticEvent, useState } from 'react'
import styled from 'styled-components'
import { API_POINT } from '../constants/api'
import SpinnerIcon from '../svgs/loader.svg'

interface Subscribe {
  className?: string
  title?: string
  buttonText?: string
  onSuccess?: () => void
  slug: string
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-row-gap: 1.2rem;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 1.7rem;
  line-height: 1.2em;
`

const Message = styled.div`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  justify-self: center;
  max-width: 28rem;
  font-weight: normal;
  font-size: 1.3rem;
  line-height: 1.2em;
`

const Form = styled.form`
  display: grid;
  justify-content: center;
  grid-template-columns: minmax(15rem, 20rem) 6.7rem;
  grid-column-gap: 1rem;
`

const Input = styled.input<{ isError: boolean }>`
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

const Error = styled.div`
  color: ${(props) => props.theme.colors.red};
  margin-top: 0.5rem;
  margin-left: 1.3rem;
`

const Subscribe = ({
  slug,
  className,
  title = 'Subscribe to my newsletter',
  buttonText = 'Subscribe',
  onSuccess,
}: Subscribe) => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch(`${API_POINT}api/subscribe?slug=${slug}&email=${email}`)

    const data = await response.json()

    if (!data.ok) {
      setIsError(true)
      setError(data.statusText)
    } else {
      setEmail('')
      setMessage('Thank you for subscribing! 👍')
      onSuccess?.()
    }
    setLoading(false)
  }
  return (
    <Container className={className}>
      <Title>{title}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          isError={isError}
          value={email}
          name="email"
          onChange={(data) => {
            setIsError(false)
            setError('')
            setMessage('')
            setEmail(data.target.value)
          }}
          placeholder="email"
        />
        <Button type="submit">{loading ? <SpinnerIcon /> : buttonText}</Button>
        {isError && <Error>{error}</Error>}
      </Form>
      <Message>
        {message ||
          'Get emails from me about everything tech, web development and developer lifestyle.'}
      </Message>
    </Container>
  )
}

export default Subscribe
