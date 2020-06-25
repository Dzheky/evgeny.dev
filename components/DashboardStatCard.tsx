import React from 'react'
import styled from 'styled-components'
import isNumber from 'lodash/isNumber'
import isYesterday from 'date-fns/isYesterday'
import LinkIcon from '../svgs/link2.svg'
import UnsplashIcon from '../svgs/socialMedia/unsplash.svg'
import GitHubIcon from '../svgs/socialMedia/githubFilled.svg'
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
  link?: string
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

const Title = styled.a`
  display: grid;
  cursor: pointer;
  align-items: center;
  grid-template-columns: auto auto;
  grid-column-gap: 0.65rem;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.6rem;

  &:hover {
    opacity: 0.8;
  }
`

const LogoContainer = styled.a`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  text-transform: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;

  &:hover {
    opacity: 0.8;
  }

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
  link,
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

    if (
      filteredNumbers.length &&
      number > filteredNumbers[filteredNumbers.length - 1]?.value
    ) {
      return `+${format(number - filteredNumbers[filteredNumbers.length - 1].value)}`
    }

    return ''
  }

  return (
    <Container className={className}>
      <Header>
        <Title rel="noopener noreferrer" href={link} target="_blank">
          {title}
          {link && <LinkIcon />}
        </Title>
        <LogoContainer rel="noopener noreferrer" href={link} target="_blank">
          {logoTitleRouter()}
          {logoIconRouter()}
        </LogoContainer>
      </Header>
      <Stat>
        <MainNumber>{isNumber(number) ? format(number) : '-‍'}</MainNumber>
        <Difference>{calculateDifference()}</Difference>
      </Stat>
    </Container>
  )
}

export default DashboardStatCard
