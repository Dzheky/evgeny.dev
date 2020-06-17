import { NextApiRequest, NextApiResponse } from 'next'
import Initialize from '../../utils/db'

export interface EvgenyDevData {
  views: number
  subscribers: number
}

export default async (req: NextApiRequest, res: NextApiResponse<EvgenyDevData>) => {
  const db = await Initialize()
  const docRef = db.doc('evgenydev/views')
  const data = (await docRef.get()).data()

  const buttonDownResponse = await fetch('https://api.buttondown.email/v1/subscribers', {
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_CLIENT_KEY}`,
    },
  })

  const buttonDownSubs = await buttonDownResponse.json()

  res.status(200).json({ views: data.total_views, subscribers: buttonDownSubs.count })
}
