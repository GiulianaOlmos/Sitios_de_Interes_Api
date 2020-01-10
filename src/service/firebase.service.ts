import firebase from 'firebase';
//  var firebase = require('firebase-admin')
//  var functions = require('firebase-functions')


class Firebase {
  
  firebase: any;

  config = {
    apiKey: "AIzaSyCr67wg6lFCNMoUkyaS2GvvKcO9QAhCYqE",
    authDomain: "nodechallenge-424c1.firebaseapp.com",
    databaseURL: "https://nodechallenge-424c1.firebaseio.com",
    projectId: "nodechallenge-424c1",
    storageBucket: "nodechallenge-424c1.appspot.com",
    messagingSenderId: "198380806724",
    appId: "1:198380806724:web:40d57506473d3f31f39211"
  };

  constructor(){
    this.firebase = firebase.initializeApp(this.config);
  }

}
const firebaseInstance = new Firebase()

export default firebaseInstance.firebase;