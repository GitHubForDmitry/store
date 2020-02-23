import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDdxx4550swjkw4dCyaHsuIUef42_2r2vI",
    authDomain: "store-26055.firebaseapp.com",
    databaseURL: "https://store-26055.firebaseio.com",
    projectId: "store-26055",
    storageBucket: "store-26055.appspot.com",
    messagingSenderId: "196660907519",
    appId: "1:196660907519:web:53ae89eeec8d606e0debca",
    measurementId: "G-BJPZJ49HCE"
};
// Initialize Firebase

const  initialize = firebase.initializeApp(firebaseConfig);
export default initialize;