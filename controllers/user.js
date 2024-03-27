const bcrypt = require('bcrypt')
const User = require('../models/user')

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.send({
      message: 'Users were fetched successfully',
      users,
    })
  } catch (error) {
    res.send({
      message: 'There was an error when fetching all the users',
    })
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body

    let hashPass = await bcrypt.hash(password, 10)

    if (!name || !email || !password || !mobile) {
      return res.send({
        message: 'One of the fields is missing. Please check it and try again.',
      })
    }

    await User.create({ name, email, password: hashPass, mobile })

    res.send({ message: 'The user was added successfully to the database' })
  } catch (error) {
    res.send({
      message: 'There was an error in adding the user to the database',
    })
  }
}

module.exports = { fetchUsers, registerUser }
