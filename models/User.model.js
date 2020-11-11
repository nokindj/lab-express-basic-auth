// User model here
const mongoose = require("mongoose");
const { Schema, model } = mongoose; 

const userSchema = new Schema (
    {
        username: {
            type: String, 
            unique: true
        }, 
        password: {
            type: String, 
            require: true
        }
    }
)

module.exports = model("User", userSchema);