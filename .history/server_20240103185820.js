const express = require('express');

const app = express();

const admin = requir "firebase-admin";

import serviceAccount from "./serviceAccountKey.json" assert { type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//initialize db
const dbFireStrore = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}.`);
})