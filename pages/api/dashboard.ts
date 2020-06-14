import { NextApiRequest, NextApiResponse } from 'next'
import Initialize from '../../utils/db'

export interface Statistics {
  date: {
    seconds: number
  }
  evgenydev: {
    subscribers: number
    views: number
  }
  lastfm: {
    artists: number
    scrobbles: number
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

interface Data {
  statistics: []
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  Initialize().then((db) => {
    const docRef = db.doc('evgenydev/dashboard')
    docRef
      .get()
      .then((docSnapshot) => {
        res.status(200).json(docSnapshot.data() as Data)
      })
      .catch((error) => {
        res.status(500).json(error)
      })
  })
}
