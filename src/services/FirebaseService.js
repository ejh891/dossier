import firebase from 'firebase';
import uuidv4 from 'uuid/v4';

import Hosts from 'settings/hosts';

const config = {
  apiKey: "AIzaSyA6jy_v2dWihiqrw-Jp_xcBr-f_jMLDjWY",
  authDomain: "dossier-953fe.firebaseapp.com",
  databaseURL: "https://dossier-953fe.firebaseio.com",
  projectId: "dossier-953fe",
  storageBucket: "dossier-953fe.appspot.com",
  messagingSenderId: "1048697460512"
};

firebase.initializeApp(config);

const storageRef = firebase.storage().refFromURL(Hosts.googleCloudStorageBucket);

class FirebaseService {
  static async upload(file) {
    const ref = storageRef.child(uuidv4());

    const uploadTask = ref.put(file);

    return new Promise((resolve, reject) => {
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // Sample code for tracking progress
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        // switch (snapshot.state) {
        //   case firebase.storage.TaskState.PAUSED: // or 'paused'
        //     console.log('Upload is paused');
        //     break;
        //   case firebase.storage.TaskState.RUNNING: // or 'running'
        //     console.log('Upload is running');
        //     break;
        // }
      }, function (error) {
        reject(error);
      }, function () {
        resolve(uploadTask.snapshot.downloadURL);
      });
    });
  }

  static async deleteUpload(url) {
    const ref = firebase.storage().refFromURL(url);

    ref.delete();
  }
}

export default FirebaseService;
