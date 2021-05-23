const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.js');
const User = require('../model/auth');


exports.getallUsersInfo = (req, res) =>{
    User.find({}, {password:0},(err, data) =>{
        if(err) console.log(err)
        res.send(data);
    })
}

exports.signUp = (req, res) =>{
    var hashedpassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password : hashedpassword
    }, (err, data) =>{
        if(err) console.log(err)
        res.send("successfully Registered");
    })
}

exports.signIn = (req, res) =>{
    User.findOne({ email: req.body.email}, (err, data) =>{
        if(err) return res.status(500).send({auth:false, "error":'Error While login'})
        if(!data) return res.status(500).send({auth:false, "error":'No user Found Register First'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,data.password)
            if(!passIsValid) return res.status(500).send({auth:false, "error":'Invalid Password'})

            //here we are generating token
            //userid,secert,expiretime
            var token = jwt.sign({id:data._id},config.secert,{expiresIn:864000});
            res.header('auth-token', token).send(token)
            // console.log(token)
        }
    })
}