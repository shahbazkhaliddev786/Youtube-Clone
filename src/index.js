import dotenv from 'dotenv';
import connectDB from "./db/index.js";
dotenv.config({ path:'./env' });

// As async function returns promise, handle it
connectDB();

// When you make changes in environment variable, do restart nodemon can't help in this case.