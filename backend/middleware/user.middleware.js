import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js'

export const userMiddleware = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        return res.status(401).json({ message: 'Token expired' })
      }

      req.user = await User.findById(decoded.id).select('-password')
      
      // Token is valid, proceed to next middleware
      next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' })
      }

      console.error('Auth error:', error)
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}
