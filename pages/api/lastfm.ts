import { NextApiRequest, NextApiResponse } from 'next'

export interface LastFmData {
  scrobbles: number
}

export default async (req: NextApiRequest, res: NextApiResponse<LastFmData>) => {
  const result = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=dzheky&api_key=${process.env.LASTFM_ACCESS_KEY}&format=json`,
  )
  if (result) {
    const data = await result.json()
    res.status(200).json({ scrobbles: data?.user?.playcount })
  }
}
