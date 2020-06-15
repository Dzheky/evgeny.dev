import React from 'react'
import styled from 'styled-components'
import isYesterday from 'date-fns/isYesterday'
import UnsplashIcon from '../svgs/socialMedia/unsplash.svg'
import GitHubIcon from '../svgs/socialMedia/gitHubFilled.svg'
import StackOverflowIcon from '../svgs/socialMedia/stackOverflow.svg'
import LastFmIcon from '../svgs/socialMedia/lastFm.svg'
import YouTubeIcon from '../svgs/socialMedia/youTube.svg'
import { format } from '../utils/number'
import { Logo } from './Logo'

export enum DashboardStatIcons {
  unsplash = 'unsplash',
  stackOverflow = 'stackOverflow',
  gitHub = 'gitHub',
  lastFm = 'lastFm',
  youTube = 'youTube',
  evgenyDev = 'evgenyDev',
}

interface DashboardStatCard {
  title: string
  type: DashboardStatIcons
  number: number
  pastNumbers: { value?: number; date?: number }[]
  className?: string
}

const Container = styled.div`
  height: 10.6rem;
  border: 0.1rem solid rgba(${(props) => props.theme.colors.primaryRGB}, 0.2);
  border-radius: 1.7rem;
  padding: 1.4rem;
`

const SmallLogo = styled(Logo)`
  font-size: 1.5rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;

  & > svg {
    height: 1.8rem;
    width: auto;
    margin-left: 0.6rem;
  }
`

const Stat = styled.div`
  display: grid;
  justify-content: start;
  align-items: center;
  grid-template-columns: auto auto;
  grid-column-gap: 0.8rem;
`

const MainNumber = styled.div`
  font-weight: bold;
  font-size: 4.42rem;
`

const Difference = styled.div`
  font-weight: bold;
  font-size: 2.52rem;
  color: ${(props) => props.theme.colors.orange};
`

const DashboardStatCard = ({
  title,
  type,
  className,
  number,
  pastNumbers,
}: DashboardStatCard) => {
  const logoTitleRouter = () => {
    switch (type) {
      case DashboardStatIcons.unsplash:
        return 'Unsplash'
      case DashboardStatIcons.stackOverflow:
        return 'StackOverflow'
      case DashboardStatIcons.gitHub:
        return 'GitHub'
      case DashboardStatIcons.lastFm:
        return 'LastFM'
      case DashboardStatIcons.youTube:
        return 'YouTube'
      default:
        return ''
    }
  }

  const logoIconRouter = () => {
    switch (type) {
      case DashboardStatIcons.unsplash:
        return <UnsplashIcon />
      case DashboardStatIcons.stackOverflow:
        return <StackOverflowIcon />
      case DashboardStatIcons.gitHub:
        return <GitHubIcon />
      case DashboardStatIcons.lastFm:
        return <LastFmIcon />
      case DashboardStatIcons.youTube:
        return <YouTubeIcon />
      case DashboardStatIcons.evgenyDev:
        return <SmallLogo strip />
      default:
        return ''
    }
  }

  const calculateDifference = () => {
    if (!pastNumbers) {
      return ''
    }

    const filteredNumbers = pastNumbers.filter((past) => {
      return isYesterday(new Date(past.date * 1000))
    })

    if (filteredNumbers.length && number > filteredNumbers[0]?.value) {
      return `+${format(number - filteredNumbers[0].value)}`
    }

    return ''
  }

  return (
    <Container className={className}>
      <Header>
        <Title>{title}</Title>
        <LogoContainer>
          {logoTitleRouter()}
          {logoIconRouter()}
        </LogoContainer>
      </Header>
      <Stat>
        <MainNumber>{number ? format(number) : '-‍'}</MainNumber>
        <Difference>{calculateDifference()}</Difference>
      </Stat>
    </Container>
  )
}

export default DashboardStatCard
