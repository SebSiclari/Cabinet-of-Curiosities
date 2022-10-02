import * as Firebase from 'firebase'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeKN38eT2LZgdZOq4MQ6UHjN_EGLUTV0s",
  authDomain: "cabinet-of-curiosities-eec59.firebaseapp.com",
  projectId: "cabinet-of-curiosities-eec59",
  storageBucket: "cabinet-of-curiosities-eec59.appspot.com",
  messagingSenderId: "256047849920",
  appId: "1:256047849920:web:c0b3394ca763e8c0772825"
};

let app;
if (Firebase.apps.length === 0) {
  app = Firebase.initializeApp(firebaseConfig);
} else {
  app = Firebase.app();
}

const auth = Firebase.auth();
const db = Firebase.firestore();

export { auth, db, firebaseConfig };
