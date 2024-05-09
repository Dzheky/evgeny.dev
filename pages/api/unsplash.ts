import { NextApiRequest, NextApiResponse } from 'next'
import Unsplash from 'unsplash-js'

export interface UnsplashData {
  downloads: number
  followers_count: number
  total_likes: number
}

const unsplash = Unsplash.createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY })

export default async (req: NextApiRequest, res: NextApiResponse<UnsplashData>) => {
  const dzheky = await unsplash.users.get({ username: 'dzheky' })
  const { followers_count, total_likes, downloads } = dzheky.response
  res.status(200).json({ downloads, followers_count, total_likes })
}
