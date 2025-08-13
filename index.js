import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import User from './models/User.js';
import db from "./db/conn.js"
import session from "express-session"
import flash from "connect-flash"
import userRoutes from "./routes/userRoutes.js"


// Configurações iniciais
dotenv.config();
const app = express();

// Template engine (express-handlebars)
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 


// Middlewares
app.use(express.static("public"));

app.use((req, res, next) => {
    res.locals.msg = req.flash("msg");
    next();
});

app.use("/", userRoutes);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor rodando!");
});
