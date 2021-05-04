const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post('/', userController.create)
userRoutes.post('/login', userController.login)
userRoutes.get("/verify", userController.verify)
userRoutes.get('/samples', userController.getSamples)
userRoutes.get('/info', userController.getUserInfo)
userRoutes.post('/save/', userController.saveSample)
userRoutes.get('/savedsamples', userController.getSaved)
userRoutes.delete('/delete/:sampleId', userController.deleteSave)
module.exports = userRoutes