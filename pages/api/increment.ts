import { NextApiRequest, NextApiResponse } from 'next'
import Initialize from '../../utils/db'
import firebase from 'firebase-admin'
import 'firebase/firestore'

interface Data {
  ok?: boolean
  error?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const slug = req.query.slug
  if (!slug) {
    return res.status(400).json({
      error: 'No slug provided',
    })
  }
  const db = await Initialize()
  const docRef = db.doc('evgenydev/views')
  const data = (await docRef.get()).data()
  const prevPostNumber = data.posts[slug as string] || 0
  docRef.update({
    total_views: firebase.firestore.FieldValue.increment(1),
    [`posts.${slug}`]: prevPostNumber + 1,
  })

  res.status(200).json({ ok: true })
}
