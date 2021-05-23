const express = require('express')

const router = express.Router()

const { getallUsersInfo, signUp, signIn} = require('../controller/auth')

router.get('/usersinfo', getallUsersInfo)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router