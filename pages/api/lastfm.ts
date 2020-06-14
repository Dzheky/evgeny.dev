import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  scrobbles: number
  artists: number
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ scrobbles: 55188, artists: 7849 })
}
