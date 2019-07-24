import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Configuracion y llaves para utilizar firebase
const config = {
  apiKey: "AIzaSyC_gm1h2YMOSg8kTSM61DUE_HAq5I96TtI",
  authDomain: "crwn-db-46b62.firebaseapp.com",
  databaseURL: "https://crwn-db-46b62.firebaseio.com",
  projectId: "crwn-db-46b62",
  storageBucket: "crwn-db-46b62.appspot.com",
  messagingSenderId: "1009468260662",
  appId: "1:1009468260662:web:e9a090e210283bc8"
};

firebase.initializeApp(config);

// Obtener usuarios cuando se inicia sesion con Google y guardarlos en la base de datos de firebase

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // console.log(userAuth);

  // Se verifica si existe el objeto userAuth
  if (!userAuth) return;

  // se hace el query en la base de datos de firebase
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // El snapshot se obtiene con la referenceia del query de arriba
  const snapShot = await userRef.get();

  // Se verifica si existe el snapshot
  if (!snapShot.exists) {
    // Se obtienen los valores del usuario logueado
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Se guarda el usuario en la base de datos de firebase
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// Esto va a servir para poder iniciar sesion
export const auth = firebase.auth();

// Esto va a servir para poder almacenar informacion a firebase
export const firestore = firebase.firestore();

// Se crea un provider en donde se indica que se va a autentificar con la cuenta de google
const provider = new firebase.auth.GoogleAuthProvider();
// Se pone como parametro que va a aparecer una pantalla emergente al momemnto de quere iniciar sesion con google
provider.setCustomParameters({ prompt: "select_account" });

// Se crea una variable que contiene el provider
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
