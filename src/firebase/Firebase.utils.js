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

  // se hace el query (objeto) en la base de datos de firebase, esta solo es la referencía hacia un usuario, esta es la referencia
  // se utiliza para crear un snapShot de la informacion del usuario
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // El snapshot (objeto) se obtiene con la referenceia del query de arriba, con el snapshot se verifica si el usuario existe en
  // la base de datos
  const snapShot = await userRef.get();
  // console.log(snapShot);

  // Se verifica si existe el snapshot (si el usuario existe o no en la base de datos)
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

// Funcion para añadir collecion y documentos (tabla y elementos) a la base de datos

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // Esto es para verificar que TODOS los elementos se carguen a la base de datos, ya que si por alguna razon no se  guardan todos se cancela la accion
  const batch = firestore.batch();

  // Se recorren todos los grupos de la tienda (hats, sneakers, etc.)
  objectsToAdd.forEach(obj => {
    // Se crea  una nueva referencia, en donde se crea un id unico para cada grupo de la tienda
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);

    // Se guarda cada
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// Esta funcion recibe como parametro querySnapshots, y convierte esos querys un array con los objetos de cada grupo de items (hats, etc)
export const convertCollectionsSnapshotToMap = collections => {
  // Aqui se recorre cada doc que se recibe
  const transformCollection = collections.docs.map(doc => {
    // Se hace destructuring del documento, en donde ahora si se obtiene la informacion de la base de datos, como se recibe un snapshot, se utiliza
    // doc.data() para obtener la informacion, es como si se utilizara snapshot.data()
    const { title, items } = doc.data();

    // Finalmente se regresa el nuevo objeto, con el nombre para la ruta, el id del documento (id de la collecion, no de cada elemento ) el titulo
    // y los items de la coleccion (grupo de item: hats, sneakers, jackets, etc)
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Esto sirve para poder iniciar sesion
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
