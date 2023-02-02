import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Subscribe from '../components/Subscribe'
import { useRouter } from 'next/router'

interface SubscribeProps {
  className?: string
}

const Container = styled.div`
  margin-top: 2.5rem;
`

const SubscribePage = (props: SubscribeProps) => {
  const router = useRouter()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (isSubscribed) {
      router.push('/obsidian_vault_template.zip')
    }
  }, [isSubscribed])

  const onSubscribed = () => {
    setIsSubscribed(true)
  }

  return (
    <Container className={props.className}>
      <Head>
        <title>Subscription page</title>
      </Head>
      <Subscribe
        slug="obsidian"
        title="Subscribe to my newsletter and receive Obsidian template!"
        onSuccess={onSubscribed}
      />
    </Container>
  )
}

export default SubscribePage
