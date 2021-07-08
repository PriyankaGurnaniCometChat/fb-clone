import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from "../app.config"


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db