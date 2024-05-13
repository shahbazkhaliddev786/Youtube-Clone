import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit:"15kb"}));
app.use(express.urlencoded({extended: true, limit:"15kb"})); // data from url. extended true mean can get nested data objects from client. 
app.use(express.static("public")); // access local assets on server
app.use(cookieParser());

// callback takes 4 parameters
// app.get("/", (err,req,res,next)=>{
//     console.log(err);
//     console.log(req);
//     console.log(res);
//     console.log(next);
// });

export {app};