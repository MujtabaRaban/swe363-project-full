const path = require('path');
const express = require('express');
const bodyparse = require("body-parser");
const  Collection  = require('mongoose');
const { default: mongoose } = require('mongoose');



Collection.connect("mongodb+srv://alraban3:WxiFn3gtWkmXdr2o@cluster0.o8f6f0s.mongodb.net/dammamsportcentre")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const app  = express();
var db = mongoose.connection;





app.use(express.json());

app.use(bodyparse.urlencoded({
    extended:true
}));

app.use(express.static('dammam sport center'));

app.listen(3000,'localhost' , () =>{

    console.log('listing to the req')
})



app.get('/' , (req,res) => {
    res.sendFile('./dammam sport center/login-user.html',{ root : __dirname});
});
app.get('/academices' , (req,res) => {
    res.sendFile('./dammam sport center//academices.html',{ root : __dirname});
});
app.get('/stadiums' , (req,res) => {
    res.sendFile('./dammam sport center/stadiums.html',{ root : __dirname});
});
app.get('/matches' , (req,res) => {
    res.sendFile('./dammam sport center/matches.html',{ root : __dirname});
});
app.get('/tournaments' , (req,res) => {
    res.sendFile('./dammam sport center/tournaments.html',{ root : __dirname});
});
app.get('/login' , (req,res) => {
    res.sendFile('./dammam sport center/login-user.html',{ root : __dirname});
});
app.get('/login-admin' , (req,res) => {
    res.sendFile('./dammam sport center/login-admin.html',{ root : __dirname});

});




app.post("/sign-up-user",(req,res) => {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name":name,
        "email":email,
        "password":password


    }
    db.collection('users').insertOne(data,(err,collection)=> {
        if (err){
            throw err;
        }
        console.log("recorded successfully");
    })
    return res.redirect("index-login.html");

})

app.post("/sign-up-admin",(req,res) => {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name":name,
        "email":email,
        "password":password


    }
    db.collection('admin').insertOne(data,(err,collection)=> {
        if (err){
            throw err;
        }
        console.log("recorded successfully");
    })
    return res.redirect("index-login-admin.html");

})

app.post("/sign-on-user",(request,response) => {

    try{
        const email = request.body.email;
        const password = request.body.password;

        db.collection('users').findOne({ email:email},
            (err,res) => {
                if (res ===null){
                    response.send('information not match , please create an account');
                    
                }else if (err) throw err;
                
                if (res.password===password){
                    console.log('login successfully');
                    return response.redirect('index-login.html')
                }else{
                    console.log("password not match");
                    return response.redirect('index.html')
                }
            })


    }catch(error){
        console.log("invalid information")
    }

})

app.post("/sign-on-admin",(request,response) => {

    try{
        const email = request.body.email;
        const password = request.body.password;

        db.collection('admin').findOne({ email:email},
            (err,res) => {
                if (res ===null){
                    response.send('information not match , please create an account');
                    
                }else if (err) throw err;
                
                if (res.password===password){
                    console.log('login successfully');
                    return response.redirect('index-login-admin.html')
                }else{
                    console.log("password not match");
                    return response.redirect('login-admin.html')
                }
            })


    }catch(error){
        console.log("invalid information")
    }

})

