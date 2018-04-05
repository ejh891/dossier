import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA6jy_v2dWihiqrw-Jp_xcBr-f_jMLDjWY",
  authDomain: "dossier-953fe.firebaseapp.com",
  databaseURL: "https://dossier-953fe.firebaseio.com",
  projectId: "dossier-953fe",
  storageBucket: "dossier-953fe.appspot.com",
  messagingSenderId: "1048697460512"
};

firebase.initializeApp(config);

export const firebaseStorage = firebase.storage();
export const firebaseAuth = firebase.auth();
export const firebaseFacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
