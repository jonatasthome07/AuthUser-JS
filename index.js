import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import User from './models/User';
import db from "./db/conn"

// Configurações iniciais
dotenv.config();
const app = express();

// Template engine (express-handlebars)
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor rodando!");
});
