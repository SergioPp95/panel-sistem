const bcrypt = require("bcrypt");
const { unlinkSync } = require('fs')
const { validationResult } = require('express-validator');
const fetch  = require('node-fetch');
const db = require('../database/models')



let userController = {
    login: (req, res) => res.render('./index', { user: req.session.userLogged }),

    ingreso: async (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            res.render('./index', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                user: req.session.userLogged
            })
        } else {

            const user = await db.User.findOne({
                where: {
                    mail: req.body.email
                },
                attributes: { exclude: ['password'] }
            })

            req.session.userLogged = user.dataValues

            req.body.recordar ? res.cookie("userLogged", user.dataValues.mail, { maxAge: 1000 * 60 * 60 }) : null // Cookie se guarda por 5 min

            res.redirect("/profile")
        }
    },
    registro: (req, res) => {
        res.render('register', { user: req.session.userLogged })
    },
    registrado: async (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            res.render('./register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                user: req.session.userLogged
            })
        } else { 
            const encrypted = bcrypt.hashSync(req.body.password, 10)
            const defaultPicture = "perfil.jpeg"
            const user = {
                name: req.body.name,
                last_name: req.body.lastName,
                mail: req.body.email,
                password: encrypted,
                picture: req.file ? req.file.filename : defaultPicture,
                admin: req.body.isAdmin
            }

            try {
                console.log(user)
                await db.User.create(user)
            }
            catch (error) {
                console.error(error)
            }


            res.redirect("/")
        }
    },
    profile: (req, res) => res.render('profile', { user: req.session.userLogged }),


    logout: (req, res) => {

        // Se elimina al user de session
        req.session.userLogged = null
  
        res.redirect("/")
  
     },
     list: async(req, res) => {
        fetch('http://localhost:3000/api/users') 
            .then(response => response.json())
            .then(users => {
                return res.render('apiUser', {users})
            })
     }
  
}

module.exports = userController