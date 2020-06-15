import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { UnsplashData } from './api/unsplash'
import { StackOverflowData } from './api/stackoverflow'
import { GithubData } from './api/github'
import { LastFmData } from './api/lastfm'
import { YoutubeData } from './api/youtube'
import { EvgenyDevData } from './api/evgenydev'
import { API_POINT } from '../constants/api'
import { DashboardData } from './api/dashboard'
import DashboardStatCard, { DashboardStatIcons } from '../components/DashboardStatCard'

interface Dashboard {
  className?: string
}

const Container = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: minmax(30rem, 33.2rem) minmax(30rem, 33.2rem);
  grid-gap: 2.9rem;

  @media (max-width: 710px) {
    grid-template-columns: minmax(30rem, 35rem);
  }
`

const Contacts = (props: Dashboard) => {
  const [unsplash, setUnsplash] = useState<UnsplashData>()
  const [stackOverflow, setStackOverflow] = useState<StackOverflowData>()
  const [gitHub, setGitHub] = useState<GithubData>()
  const [lastFm, setLastFm] = useState<LastFmData>()
  const [youtube, setYoutube] = useState<YoutubeData>()
  const [evgenyDev, setEvgenyDev] = useState<EvgenyDevData>()
  const [dashboard, setDashboard] = useState<DashboardData>()
  useEffect(() => {
    fetchData<UnsplashData>('unsplash', setUnsplash)
    fetchData<StackOverflowData>('stackoverflow', setStackOverflow)
    fetchData<GithubData>('github', setGitHub)
    fetchData<LastFmData>('lastfm', setLastFm)
    fetchData<YoutubeData>('youtube', setYoutube)
    fetchData<EvgenyDevData>('evgenydev', setEvgenyDev)
    fetchData<DashboardData>('dashboard', setDashboard)
  }, [])

  const fetchData = async <T extends unknown>(
    link: string,
    setFunction: (value: T) => void,
  ) => {
    const response = await fetch(`${API_POINT}/api/${link}`)
    if (response) {
      const json = await response.json()
      setFunction(json as T)
    }
  }

  return (
    <Container className={props.className}>
      {/* Unsplash */}
      <DashboardStatCard
        number={unsplash?.views}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.unsplash?.views,
          date: stat?.date?._seconds,
        }))}
        title="views"
        type={DashboardStatIcons.unsplash}
      />
      <DashboardStatCard
        number={unsplash?.downloads}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.unsplash?.downloads,
          date: stat?.date?._seconds,
        }))}
        title="downloads"
        type={DashboardStatIcons.unsplash}
      />
      {/* StackOverflow */}
      <DashboardStatCard
        number={stackOverflow?.reputation}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.stackoverflow?.reputation,
          date: stat?.date?._seconds,
        }))}
        title="reputation"
        type={DashboardStatIcons.stackOverflow}
      />
      <DashboardStatCard
        number={stackOverflow?.answers}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.stackoverflow?.answers,
          date: stat?.date?._seconds,
        }))}
        title="answers"
        type={DashboardStatIcons.stackOverflow}
      />
      {/* GitHub */}
      <DashboardStatCard
        number={gitHub?.stars}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.github?.stars,
          date: stat?.date?._seconds,
        }))}
        title="stars"
        type={DashboardStatIcons.gitHub}
      />
      <DashboardStatCard
        number={gitHub?.followers}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.github?.followers,
          date: stat?.date?._seconds,
        }))}
        title="followers"
        type={DashboardStatIcons.gitHub}
      />
      {/* YouTube */}
      <DashboardStatCard
        number={youtube?.views}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.youtube?.views,
          date: stat?.date?._seconds,
        }))}
        title="views"
        type={DashboardStatIcons.youTube}
      />
      <DashboardStatCard
        number={youtube?.subscribers}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.youtube?.subscribers,
          date: stat?.date?._seconds,
        }))}
        title="subscribers"
        type={DashboardStatIcons.youTube}
      />
      {/* Evgeny.dev */}
      <DashboardStatCard
        number={evgenyDev?.subscribers}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.evgenydev?.subscribers,
          date: stat?.date?._seconds,
        }))}
        title="newsletter subs"
        type={DashboardStatIcons.evgenyDev}
      />
      <DashboardStatCard
        number={evgenyDev?.views}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.evgenydev?.views,
          date: stat?.date?._seconds,
        }))}
        title="blog views"
        type={DashboardStatIcons.evgenyDev}
      />
      {/* LastFM */}
      <DashboardStatCard
        number={lastFm?.scrobbles}
        pastNumbers={dashboard?.statistics?.map((stat) => ({
          value: stat?.lastfm?.scrobbles,
          date: stat?.date?._seconds,
        }))}
        title="scrobbles"
        type={DashboardStatIcons.lastFm}
      />
    </Container>
  )
}

export default Contacts
