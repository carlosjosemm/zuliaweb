import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAvrrFktTVHAtgO7EAyYHa7mcqpXZz1C_E",
    authDomain: "tiendazuliaweb.firebaseapp.com",
    projectId: "tiendazuliaweb",
    storageBucket: "tiendazuliaweb.appspot.com",
    messagingSenderId: "172829584084",
    appId: "1:172829584084:web:6739442055418426ce2941",
    measurementId: "G-9QBQR3FEY8"
  };

//   const firebaseApp = firebase.initializeApp(firebaseConfig);
if(!firebase.apps.length) { firebase.initializeApp(firebaseConfig) };
  const auth = firebase.auth();
  const ggprovider = new firebase.auth.GoogleAuthProvider();
  const fbprovider = new firebase.auth.FacebookAuthProvider();
  // fbprovider.addScope('email');


  export {auth, ggprovider, fbprovider};
  const db = firebase.firestore();
  export default db;