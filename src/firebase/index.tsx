// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getCurrentDate } from "../utils";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsBRRuBKeeOWczi8M5qSBH5uRDRn9J_dE",
    authDomain: "twims-a8bba.firebaseapp.com",
    databaseURL: "https://twims-a8bba-default-rtdb.firebaseio.com",
    projectId: "twims-a8bba",
    storageBucket: "twims-a8bba.appspot.com",
    messagingSenderId: "138029493731",
    appId: "1:138029493731:web:e54984e0572260fcc584d6",
    measurementId: "G-C5ZQY1523F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export const signInUser = (email: any, password: any) => {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            localStorage.setItem('user', JSON.stringify(user.email));
        })
        .catch((error) => {
            const errorMessage = error.message;

            alert(errorMessage);
        });
}

export const signOutUser = () => {
    signOut(auth).then(() => {
        // Sign-out successful.

        localStorage.clear();
    }).catch((error) => {
        // An error happened.

    });
}

export const getDBData = (dbReference: string) => {

    return new Promise((resolve, reject) => {
        const db = getDatabase();
        const starCountRef = ref(db, dbReference);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        });
    })
}

export const addDataToFirebaseDB = (data: object) => {
    const db = getDatabase();
    const assignedItemListRef = ref(db, '/AssignedInventoryDetails');

    const newAssignedItemListRef = push(assignedItemListRef);
    set(newAssignedItemListRef, data);
}

