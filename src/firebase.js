import { initializeApp } from 'firebase'
import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from './actions/items'



const firebaseApp = initializeApp({
  apiKey: "AIzaSyDUUc8fGOWHpaegxo_XzHbT8TBMIrcAAnY",
  authDomain: "restaurant-aware.firebaseapp.com",
  databaseURL: "https://restaurant-aware.firebaseio.com",
  storageBucket: "restaurant-aware.appspot.com",
  messagingSenderId: "675136691429"
})
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
