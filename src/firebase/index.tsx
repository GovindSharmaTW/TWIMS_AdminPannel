// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set, push, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                localStorage.setItem('user', JSON.stringify(user.email));

                toast.success('SignIn Successfully');
                resolve(true);

            })
            .catch((error) => {
                const errorMessage = error.message;
                resolve(false);
                toast.error(errorMessage);
            });
    })
}

export const signOutUser = () => {
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            toast.success('Signout successfully');
            resolve(true);
            localStorage.clear();
        }).catch((error) => {
            // An error happened.
            toast.error(error);
            resolve(false);

        });
    })
}


export const addDataToFirebaseDB = (data: object, dbRef: string) => {

    return new Promise((resolve, reject) => {
        const db = getDatabase();
        const gotRef = ref(db, dbRef);

        const firebaseDBRef = push(gotRef);
        set(firebaseDBRef, data)
            .then(() => {
                resolve(true);

                toast.success('Data added successfully');
            })
            .catch((error) => {
                resolve(false);
                toast.error(`Something went wrong ${error}`);
            });

    })

}

export const deleteDataFromFirebaseDB = (dbRef: string, id: string) => {

    return new Promise((resolve, reject) => {
        const db = getDatabase();

        remove(ref(db, `/${dbRef}/` + id))
            .then(() => {
                resolve(true);

                toast.success('data deleted successfully');
            })
            .catch((error) => {
                resolve(false);
                toast.error(`Something went wrong ${error}`);
            })

    })

}

export const updateFirebaseDBData = (dbRef: string, id: string, data: {}) => {

    const datanew = 'updated ite 123'

    return new Promise((resolve, reject) => {
        const db = getDatabase();

        update(ref(db, `/${dbRef}/` + id), data)
            .then(() => {
                resolve(true);
                toast.success('data updated successfully');
            })
            .catch((error) => {
                resolve(false);
                toast.error(`Something went wrong ${error}`);
            })

    })

}


