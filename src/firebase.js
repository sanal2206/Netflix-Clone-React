 
import { initializeApp } from "firebase/app";
 
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpMkOnwbF4XrmwqXIjSMUMwxtjI0BCpws",
  authDomain: "netflix-clone-48ff2.firebaseapp.com",
  projectId: "netflix-clone-48ff2",
  storageBucket: "netflix-clone-48ff2.firebasestorage.app",
  messagingSenderId: "226319847461",
  appId: "1:226319847461:web:f817527954373c107f6fcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)



// sing in or register account

const signup=async(name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            authProvider:'local',
            email
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}




// user sing in

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
        
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))

        
    }   
}



// logout

const logout=()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout};