const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 4,
        max: 32
    },
    email:{
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 32
    },
    password:{
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('User', userSchema)