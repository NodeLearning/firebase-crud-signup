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
        const usersRef = dbFireStrore.collection("users");
        const response = await usersRef.get(); // here we get many things from firestore other than data
        let responseArr = [];
        response.forEach( doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
})

app.get('/read/:id', async (req,res)=> {
    try {
        const userRef = dbFireStrore.collection('users').doc(req.params.id);
        const response = await userRef.get();
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})



const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}.`);
})