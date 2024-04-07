const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const register = require('./routes/register')
const jobs = require('./routes/jobs')

const app = express()

dotenv.config()
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/health', (req, res) => {
  try {
    res.send('Express server is up and running')
  } catch (error) {
    console.log(error)
  }
})

app.use('/api/v1/users', register)
app.use('/api/v1/jobs', jobs)

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('The server and database are connected')
  } catch (error) {
    console.log(error)
  }
})
