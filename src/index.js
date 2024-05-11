import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Youtube Clone Express App");
});

app.listen(PORT, ()=>{
    console.log(`Server started at: http://localhost:${PORT}`);
});