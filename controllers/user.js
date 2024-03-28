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
    // console.log(error);
    res.send({
      message: 'There was an error in adding the user to the database',
    })
  }
}

const loginUser = async (req, res) => {
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

  res.json({
    message: 'User has been logged in successfully',
    name: checkUser?.name,
    email: checkUser?.email
  })
}

module.exports = { fetchUsers, registerUser, loginUser }
