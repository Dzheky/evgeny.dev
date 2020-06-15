import { NextApiRequest, NextApiResponse } from 'next'

export interface EvgenyDevData {
  views: number
  subscribers: number
}

export default (req: NextApiRequest, res: NextApiResponse<EvgenyDevData>) => {
  res.status(200).json({ views: 7849, subscribers: 10 })
}
