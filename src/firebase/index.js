import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDVLQvYY1gAzVLRHH7FXut-p68QAzlMUKw",
    authDomain: "store-11821.firebaseapp.com",
    databaseURL: "https://store-11821.firebaseio.com",
    projectId: "store-11821",
    storageBucket: "store-11821.appspot.com",
    messagingSenderId: "60764109940",
    appId: "1:60764109940:web:8b8fe370f57e9345fce521",
    measurementId: "G-1FC5JX6YFS"
};
// Initialize Firebase

const  initialize = firebase.initializeApp(firebaseConfig);
export default initialize;