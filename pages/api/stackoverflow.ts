import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  reputation: number
  answers: number
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ reputation: 71, answers: 7 })
}
