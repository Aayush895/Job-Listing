const express = require('express')
const router = express.Router()
const {allJobs} = require('../controllers/job')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/all-jobs', allJobs)

module.exports = router