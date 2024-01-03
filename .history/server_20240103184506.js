import express from 'express';

const app = express();

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//initialize db
const dbFireStrore = admin.firestore();

app.use(express.json());

app.use(express.urlencoded())