import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_ACCESS_KEY,
})

export interface YoutubeData {
  views: number
  subscribers: number
}

export default async (req: NextApiRequest, res: NextApiResponse<YoutubeData>) => {
  const options = {
    id: ['UCeBNd0PtTogVu8Dq9pX6LQw'],
    part: ['statistics'],
  }
  const response = await youtube.channels.list(options)
  const statistics = response.data?.items[0]?.statistics
  if (statistics) {
    res.status(200).json({
      views: +statistics.viewCount,
      subscribers: +statistics.subscriberCount,
    })
  }
}
