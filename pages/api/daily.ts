import { NextApiRequest, NextApiResponse } from 'next'
import Initialize from '../../utils/db'
import firebase from 'firebase-admin'
import 'firebase/firestore'
import { API_POINT } from '../../constants/api'

interface Data {
  ok?: boolean
  error?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = await Promise.all([
    fetch(`${API_POINT}api/github`),
    fetch(`${API_POINT}api/lastfm`),
    fetch(`${API_POINT}api/stackoverflow`),
    fetch(`${API_POINT}api/unsplash`),
    fetch(`${API_POINT}api/youtube`),
    fetch(`${API_POINT}api/evgenydev`),
  ])
  const jsonArr = await Promise.all(data.map(async (d) => await d.json()))
  console.log(jsonArr)
  const db = await Initialize()
  const docRef = db.doc('evgenydev/dashboard')
  docRef.update({
    statistics: firebase.firestore.FieldValue.arrayUnion({
      github: jsonArr[0],
      lastfm: jsonArr[1],
      stackoverflow: jsonArr[2],
      unsplash: jsonArr[3],
      youtube: jsonArr[4],
      evgenydev: jsonArr[5],
      date: firebase.firestore.Timestamp.fromDate(new Date()),
    }),
  })

  res.status(200).json({ ok: true })
}
