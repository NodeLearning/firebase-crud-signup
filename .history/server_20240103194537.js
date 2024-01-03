const express = require('express');

const app = express();

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//initialize db
const dbFireStrore = admin.firestore();

// routes
app.post('/create', async (req, res)=> {
    try {
        const id = req.body.email;
        const userjson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        const response = await dbFireStrore.collection("users").add(userjson);  // .doc(id).set(userjson);
        res.send(response);
    } catch (error) {
        res.send({Error: error});
    }
})

app.get('/read/all', async (req,res)=>{
    try {
        const userRef
    } catch (error) {
        
    }
})



const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}.`);
})