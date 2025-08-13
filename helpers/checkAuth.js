import jwt from "jsonwebtoken"

export default function checkAuth (req, res, next){
    const token = req.cookies.token
    if (!token){
        return res.redirect("/login")
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.redirect("/login")
    }
}