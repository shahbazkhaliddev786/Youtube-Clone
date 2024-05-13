import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// another way of creating schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true // if we want to search in client, we can do without index but it's optimized
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    fullName: {
        type: String,
        required: true,
        trim:true,
        index:true
    },
    avatar:{
        type: String, // cloud url
        required:true
    },
    coverImage:{
        type: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true});

// Executes just before data save into db.
// don't use arrow function here as callback cuz they don'y have this.
// It is a middleware
// It is a hooks
userSchema.pre("save", async function(next){

    if(!this.isModifies("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
});


// we can add custom methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_ACCESS_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}
// difference is refresh token contains less info tha access i.e only id 

export const User = mongoose.model("User", userSchema);