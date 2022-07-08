/** @format */

const jwt = require('jsonwebtoken')

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.autorization.split(' ')[1]
      if (!token) {
        res.status(401).json({ message: 'User not authorized' })
      }
      const decoded = jwt.verify(token, process.env.SECREY_KEY)
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'User do not have rights' })
      }
      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ message: 'User not authorized' })
    }
  }
}
