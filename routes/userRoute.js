const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post('/', userController.create)
userRoutes.post('/login', userController.login)
userRoutes.get("/verify", userController.verify)
userRoutes.get('/samples', userController.getSamples)
userRoutes.get('/info', userController.getUserInfo)


module.exports = userRoutes