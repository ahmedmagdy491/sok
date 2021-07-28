import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyDUyde9jsAmnsJwZcYiIFukc6kFCzKS-ZM',
	authDomain: 'ecommerce-e38d2.firebaseapp.com',
	projectId: 'ecommerce-e38d2',
	storageBucket: 'ecommerce-e38d2.appspot.com',
	messagingSenderId: '192500781965',
	appId: '1:192500781965:web:147aa7dd5ced733236a3c4',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
