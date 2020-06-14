import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  scrobbles: number
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const result = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=dzheky&api_key=${process.env.LASTFM_ACCESS_KEY}&format=json`,
  )
  if (result) {
    const data = await result.json()
    res.status(200).json({ scrobbles: data?.user?.playcount })
  }
}
