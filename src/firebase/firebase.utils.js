import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA3JXjlzPBX-Ykq3L8VsWrnoGqe6ZS9x20",
    authDomain: "crwn-db-db76a.firebaseapp.com",
    databaseURL: "https://crwn-db-db76a.firebaseio.com",
    projectId: "crwn-db-db76a",
    storageBucket: "crwn-db-db76a.appspot.com",
    messagingSenderId: "706329356144",
    appId: "1:706329356144:web:481dc6788f2e331e6511b5"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;