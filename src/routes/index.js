const express = require('express');
const mult = require("../middlewares/multer")
const router = express.Router();
const userController = require('../controllers/userController')
const loginCokie = require('../middlewares/loginCokie')
const loginValidation = require('../middlewares/loginValidation')
const registerValidations = require('../middlewares/registerValidations')
const userCheck = require('../middlewares/userCheck')

/* GET home page. */
router.get('/', userCheck.forGuests, loginCokie, userController.login)
router.post("/", loginValidation, userController.ingreso)

router.get('/register', userCheck.forGuests, userController.registro);
router.post("/register", mult.single("userImage"), registerValidations, userController.registrado)


router.get("/profile", userCheck.forUsers,  userController.profile)

router.post('/profile', userCheck.forUsers, userController.logout)


module.exports = router;
