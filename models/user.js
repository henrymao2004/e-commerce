const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:true,
        maxlength:32
    },

    email:{
        type: String,
        trim: true,
        required:true,
        unique:32
    },

    hash_password:{
        type: String,
        required:true
    },

    about:{
        type: String,
        trim: true,
    },

    salt: String,
    role:{
        type: Number,
        default: 0,
    },
    history:{
        type: Array,
        default:[]
    }
},{timestamps: true})

//virtual field
userSchema.virtual('password').set(function(password){
    this._password = password
    this.salt = uuidv1
    this.hash_password = this.encryptPassword(password)
}.get(
    function(){
        return this._password
    }             
));

userSchema.method = {
    encryptPassword:function(password){
        if(!password) return ''
        try {
            return crypto.createHmac('shal', this.salt).update(password).digest('hex')

        } catch (err) {
            return " error"
        }

        
    }
};

module.exports = mongoose.model("User", userSchema)