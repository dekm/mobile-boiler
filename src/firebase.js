import { initializeApp } from 'firebase'
import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from './actions/items'
// you will need to create this fb_config file with your fb details
// mine looks like this
/*
export default const firebaseApp = initializeApp({
  apiKey: "XXX",
  authDomain: "XXX",
  databaseURL: "XXX",
  storageBucket: "XXX",
  messagingSenderId: "XXX"
})

*/
import firebaseApp from './fb_config'


export const itemsRef = firebaseApp.database().ref('items')
const connectedRef = firebaseApp.database().ref('.info/connected')

export function syncFirebase(store) {
  itemsRef.on('child_added', (snapshot) => {
    store.dispatch(addItemSuccess(snapshot.val()))
  })

  itemsRef.on('child_removed', (snapshot) => {
    store.dispatch(removeItemSuccess(snapshot.val().id))
  })

  connectedRef.on('value', snap => {
    if (snap.val() === true) {
      store.dispatch(goOnline())
    } else {
      store.dispatch(goOffline())
    }
  })
}
