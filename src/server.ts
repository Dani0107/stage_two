import express from "express";
var bodyParser = require('body-parser')

import { createNewUser, login } from "./handlers/user";
import exp from "constants";
import router from "./router";
import { protect } from "./modules/auth";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("Hello from express");
    res.status(200);
    res.json({message: "Hello"})
});

app.use('/api', protect, router);

app.post('/auth/register', createNewUser);

app.post('/auth/login', login);
// app.get('/user', getUser);


export default app;