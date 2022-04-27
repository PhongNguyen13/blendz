// connect to firebase
var admin = require("firebase-admin");

var serviceAccount = require("./FirebaseKey/blendz-1e3a0-firebase-adminsdk-jiczo-adb9f8b7d2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://blendz-1e3a0.firebaseio.com"
});

//verify the connection with firebase
var firebase = admin.database();
console.log(firebase);