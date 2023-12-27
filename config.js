const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAlgWEIvBw44j0PoaEZb0dyMkco1lDSWsg",
  authDomain: "who-animal.firebaseapp.com",
  databaseURL: "https://who-animal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "who-animal",
  storageBucket: "who-animal.appspot.com",
  messagingSenderId: "1093432018176",
  appId: "1:1093432018176:web:f436be1abd1eaa37d45fe5",
  measurementId: "G-DTGVM7LWZE"
};

  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
module.exports = db;