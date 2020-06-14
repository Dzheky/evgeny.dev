import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  views: number
  subscribers: number
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ views: 7849, subscribers: 10 })
}
