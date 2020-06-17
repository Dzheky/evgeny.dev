import { NextApiRequest, NextApiResponse } from 'next'
import Initialize from '../../utils/db'

export interface Statistics {
  date: {
    _nanoseconds: number
    _seconds: number
  }
  evgenydev: {
    subscribers: number
    views: number
  }
  lastfm: {
    artists: number
    scrobbles: number
  }
  github: {
    followers: number
    stars: number
  }
  stackoverflow: {
    answers: number
    reputation: number
  }
  unsplash: {
    downloads: number
    views: number
  }
  youtube: {
    subscribers: number
    views: number
  }
}

export interface DashboardData {
  statistics: Statistics[]
}

export default async (req: NextApiRequest, res: NextApiResponse<DashboardData>) => {
  try {
    const db = await Initialize()
    const docRef = db.doc('evgenydev/dashboard')
    const docSnapshot = await docRef.get()
    res.status(200).json(docSnapshot.data() as DashboardData)
  } catch (e) {
    res.status(500).json(e)
  }
}
