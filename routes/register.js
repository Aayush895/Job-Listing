const express = require('express')
const router = express.Router()
const {fetchUsers, registerUser, loginUser} = require('../controllers/user')

router.get('/', fetchUsers)
router.post('/create-user', registerUser)
router.post('/login', loginUser)

module.exports = router
