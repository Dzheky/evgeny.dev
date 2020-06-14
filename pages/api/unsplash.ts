import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  views: number
  downloads: number
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ views: 6561, downloads: 75 })
}
