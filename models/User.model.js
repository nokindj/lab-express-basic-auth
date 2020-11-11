// User model here
const mongoose = require("mongoose");
const { Schema, model } = mongoose; 

const userSchema = new Schema (
    {
        username: {
            type: String, 
            unique: true,
            required: [true, 'Username is required']
        }, 
        password: {
            type: String, 
            require: true,
            require: [true, 'Password is required']
        }
    }
)

module.exports = model("User", userSchema);