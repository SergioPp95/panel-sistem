const express = require('express')
const router = express.Router()

const usersApiController = require('../../controllers/api/apiUser')

router.get('/', usersApiController.list)

module.exports = router