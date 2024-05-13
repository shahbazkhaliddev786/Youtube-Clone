import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';
dotenv.config({ path:'./env' });

const port = process.env.PORT || 8000;

// As async function returns promise, handle it
connectDB()
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server started at: ${port}`);
        });
        app.on("error",(err)=>{
            console.log("App failed !!!", err);
        });
    })
    .catch((err)=>{
        console.log("Mongodb data conn fail !!!", err);
    }
);
// When you make changes in environment variable, do restart nodemon can't help in this case.