const { Schema, models, model } = require("mongoose");


const schema=new Schema({
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Email is Required"]
    },
    username:{
        type:String,
        required:[true,"Username is Required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String
    }
})

export const User=models.User || model("User",schema)