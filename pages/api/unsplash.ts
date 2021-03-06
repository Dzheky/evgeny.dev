import { NextApiRequest, NextApiResponse } from 'next'
import Unsplash, { toJson } from 'unsplash-js'

export interface UnsplashData {
  views: number
  downloads: number
}

const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS_KEY })

export default async (req: NextApiRequest, res: NextApiResponse<UnsplashData>) => {
  const dzheky = await unsplash.users.statistics('dzheky')
  const { views, downloads } = await toJson(dzheky)
  res.status(200).json({ views: views.total, downloads: downloads.total })
}
