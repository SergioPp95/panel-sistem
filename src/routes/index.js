const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController')


const mult = require("../middlewares/multer")
const loginCokie = require('../middlewares/loginCokie')
const userCheck = require('../middlewares/userCheck')
const loginValidation = require('../middlewares/loginValidation')
const registerValidations = require('../middlewares/registerValidations')


router.get('/', userCheck.forGuests, loginCokie, userController.login)

router.post("/", loginValidation, userController.ingreso)

router.get('/register', userCheck.forGuests, userController.registro);

router.post("/register", mult.single("userImage"), registerValidations, userController.registrado)


router.get("/profile", userCheck.forUsers,  userController.profile)

router.post('/profile', userCheck.forUsers, userController.logout)

//sector admin

router.get('/users', userController.list)

module.exports = router;
