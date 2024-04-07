const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {
    const { token } = req.headers['authorization']

    const isValidToken = jwt.verify(token, process.env.JWT_SECRET_CODE)

    if (!isValidToken) {
      return res.send({
        message: 'Unauthorized access. Please login with correct credentials.',
      })
    }

    next()
  } catch (error) {
    res.send({
      message: 'Invalid token',
      isTokenExpired: true,
    })
  }
}

module.exports = { verifyToken }
