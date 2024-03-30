const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.send({
      message: 'Users were fetched successfully',
      users,
    })
  } catch (error) {
    console.log(error)
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

    const dbUser = await User.findOne({ email: email })
    if (dbUser) {
      res.send({
        message:
          'User already exists. Please log in if account already exists.',
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const checkUser = await User.findOne({ email: email })

    if (!checkUser) {
      res.send({
        message: "User doesn't exist. Please register the user",
      })
    }

    let checkPass = await bcrypt.compare(password, checkUser?.password)

    if (!checkPass) {
      res.send({
        message: 'Invalid credentials.',
      })
    }

    const token = jwt.sign(
      { userID: checkUser?._id, userName: checkUser?.name },
      process.env.JWT_SECRET_CODE,
      { expiresIn: '1 minute' }
    )

    res.json({
      message: 'User has been logged in successfully',
      token,
      name: checkUser?.name,
      email: checkUser?.email,
    })
  } catch (error) {
    res.send({
      message:
        'Problem logging in. Please check your credentials then try again.',
    })
  }
}

module.exports = { fetchUsers, registerUser, loginUser }
