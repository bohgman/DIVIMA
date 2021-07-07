/**
 * @fileOverview  Defining the main namespace ("public library") and its MVC subnamespaces
 * @authors Gerd Wagner & Juan-Francisco Reyes
 */
'use strict';
// main namespace pl = "public library"
const pl = {m:{}, v:{}, c:{}};
// initialize Cloud Firestore through Firebase
// TODO: Replace the following with your app's Firebase project configuration
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDxJjfWA32qdBWwR6UGRpN8m0_gQjViXyM",
    authDomain: "divima-e9eb2.firebaseapp.com",
    projectId: "divima-e9eb2",
    storageBucket: "divima-e9eb2.appspot.com",
    messagingSenderId: "642215038542",
    appId: "1:642215038542:web:00fb0841bcd6e22abafd1f"
  });
} else { // if already initialized
  firebase.app();
}
// initialize Firestore database interface
const db = firebase.firestore();
// initialize Firestore auth
const auth = firebase.auth();
