import { NextApiRequest, NextApiResponse } from 'next'
import Initialize from '../../utils/db'

interface Data {
  posts: {
    [key: string]: number
  }
  total_views: number
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const db = await Initialize()
  const docRef = db.doc('evgenydev/views')
  const data = (await docRef.get()).data()

  res.status(200).json(data as Data)
}
