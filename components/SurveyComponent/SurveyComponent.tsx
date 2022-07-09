import React, { useState } from 'react'
import styled from 'styled-components'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import surveyJson from '../../utils/firstLanguageSurvey.json'
import SurveyCSS from './survey.style'
import Subscribe from '../Subscribe'

interface SurveyComponent {
  className?: string
}
const Container = styled.div``

const SurveyComponent = ({ className }: SurveyComponent) => {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const onSubscribed = () => {
    setIsSubscribed(true)
  }

  const survey = new Model(surveyJson)
  return (
    <Container className={className}>
      <SurveyCSS />
      {isSubscribed ? (
        <Survey model={survey} />
      ) : (
        <Subscribe
          slug="language-test"
          title="To see the test subscribe or confirm your email"
          onSuccess={onSubscribed}
        />
      )}
    </Container>
  )
}

export default SurveyComponent
