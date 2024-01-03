const express = require('express');

const app = express();

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//initialize db
const dbFireStrore = admin.firestore();

// auth
app.post('/signup', async(req,res)=>{
try {
    const user = {
      email: req.body.email,
      passowrd: req.body.password,
    };

    const response = await admin.auth().createUser({
      email: user.email,
      emailVerified: false,
      password: user.passowrd,
      disabled: false,
    });
} catch (error) {
    console.log("Error creating new user:", error);
    res.send()
}


});


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
        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
})

app.post('/update', async(req,res)=> {
    try {
        const id = req.body.id;
        await  dbFireStrore.collection("users").doc(id)
            .update({
                firstName: req.body.firstName
            });
        res.send({message:"updated"})
    } catch (error) {
        res.send(error);
    }
})

app.delete('/delete/:id', async(req,res)=> {
    try {
        await dbFireStrore.collection('users').doc(req.params.id)
        .delete();
        res.send({message:"Deleted!!"});
    } catch (error) {
        res.send(error);
    }
    
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}.`);
})