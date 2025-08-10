import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

export default class UserController {
    static async login (req,res){
        res.render("user/loginForm")
    }

    static async loginPost (req,res){
        const {email, password} = req.body
    }

    static async register (req,res){
        res.render("user/registerForm")
    }

    static async registerPost (req,res){
        const {name,email, password,confirmpass} = req.body
        if (!name){
            req.flash("msg", "O nome é um campo obrigatório")
            return res.redirect("/register",)
        }
    }
}