import { NextApiRequest, NextApiResponse } from 'next'
import initializeDB from '../../../utils/db'

interface Data {
  views?: number
  unique?: number
  postSlug: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  initializeDB().then((db) => {
    db.once('value').then((data) => {
      console.log(data.val())
    })
  })
  res.status(200).json({ postSlug: req.query.article as string })
}
