import * as firebase from 'firebase/app'
import 'firebase/database'
export default async () => {
  try {
    firebase.initializeApp({
      databaseURL: 'https://evgeny-dev.firebaseio.com/',
    })
  } catch (e) {
    if (!/already exists/u.test(e.message)) {
      console.error('FIREBASE ERROR: ', e.stack)
    }
  }

  return firebase.database().ref('articles')
}
