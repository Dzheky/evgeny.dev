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

export default (req: NextApiRequest, res: NextApiResponse<DashboardData>) => {
  Initialize().then((db) => {
    const docRef = db.doc('evgenydev/dashboard')
    docRef
      .get()
      .then((docSnapshot) => {
        res.status(200).json(docSnapshot.data() as DashboardData)
      })
      .catch((error) => {
        res.status(500).json(error)
      })
  })
}
