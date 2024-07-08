// const express = require('express');
// const app = express();
const port = process.env.PORT || 7000;
// const path = require('path');

// app.use(express.static("static"));

// app.get("/", (req, res) => {
    // res.sendFile("pages/index.html");
// });

import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(port, () =>{
    console.log(`Localhost is listening at http://localhost:${port}`);
});