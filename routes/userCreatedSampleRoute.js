const userCreatedSampleRoute = require('express').Router()
const userCreatedSampleController = require('../controllers/userCreatedSampleController')

userCreatedSampleRoute.post('/', userCreatedSampleController.create)
userCreatedSampleRoute.get('/:id', userCreatedSampleController.getOne)
// userCreatedSampleRoute.get('/users', userCreatedSampleController.getOwners)
userCreatedSampleRoute.delete('/:id', userCreatedSampleController.delete)
userCreatedSampleRoute.get('/search/:name', userCreatedSampleController.getAll)
userCreatedSampleRoute.put('/:id',userCreatedSampleController.edit)
module.exports = userCreatedSampleRoute

