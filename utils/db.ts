import * as firebase from 'firebase-admin'
import 'firebase/firestore'

export default async (): Promise<firebase.firestore.Firestore> => {
  let db: firebase.firestore.Firestore = null
  try {
    firebase.initializeApp({
      projectId: 'evgeny-dev',
      credential: firebase.credential.cert({
        projectId: 'evgeny-dev',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ACCESS_KEY,
      }),
    })

    db = firebase.firestore()
  } catch (e) {
    if (!/already exists/u.test(e.message)) {
      console.error('FIREBASE ERROR: ', e.stack)
    } else {
      db = firebase.firestore()
    }
  }

  return db
}
