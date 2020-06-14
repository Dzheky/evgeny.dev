import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default async (): Promise<firebase.firestore.Firestore> => {
  let db: firebase.firestore.Firestore = null
  try {
    firebase.initializeApp({
      projectId: 'evgeny-dev',
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
