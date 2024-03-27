const express = require('express')
const router = express.Router()
const {fetchUsers, registerUser} = require('../controllers/user')

router.get('/', fetchUsers)
router.post('/create-user', registerUser)

module.exports = router
