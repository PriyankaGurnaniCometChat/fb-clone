import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCS0uN8upOixSE6qV3OTRQdEZRVB-lkcgM",
    authDomain: "fb-clone-7a1d2.firebaseapp.com",
    projectId: "fb-clone-7a1d2",
    storageBucket: "fb-clone-7a1d2.appspot.com",
    messagingSenderId: "934744093231",
    appId: "1:934744093231:web:0726b4417eaaa22cef8cda",
    measurementId: "G-YW09NS7CTS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
// export default db