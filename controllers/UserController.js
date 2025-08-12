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
            return res.redirect("/register")
        }
        if (!email){
            req.flash("msg", "O e-mail é um campo obrigatório")
            return res.redirect("/register")
        }
        if (!password){
            req.flash("msg", "A senha é um campo obrigatório")
            return res.redirect("/register")
        }
        if (!confirmpass){
            req.flash("msg", "A contra-senha é um campo obrigatório")
            return res.redirect("/register")
        }
        if (password != confirmpass){
            req.flash("msg", "As senhas devem ser iguais!")
            return res.redirect("/register")
        }

        const checkUser = await User.findOne({email})
        if (checkUser) {
            req.flash("msg", "Dados já cadastrados")
            return res.redirect("/register")
        }

        const salt = await bcrypt.genSalt(12)
        const hashPass = await bcrypt.hash(password,salt)

        try {
           const user = new User({name, email, password:hashPass})
           const newUser = await user.save()
           const token = jwt.sign({
            name: newUser.name,
            id: newUser._id
           }, process.env.JWT_SECRET)
            
            req.flash("msg", "Usuário registrado com sucesso!");
            res.redirect("/login")
        } catch (error) {
            console.log(error)
        }
    }
}