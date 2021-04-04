import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBInAgQ35Ge-pAA9-EYQObAF1FEjOdH2as",
    authDomain: "whatsapp-c3286.firebaseapp.com",
    projectId: "whatsapp-c3286",
    storageBucket: "whatsapp-c3286.appspot.com",
    messagingSenderId: "731171263475",
    appId: "1:731171263475:web:82c7288d0528e14278f886"
};

//dont initialize the app if it is already up 
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export { db, auth, provider }