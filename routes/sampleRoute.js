const sampleRoutes = require('express').Router()
const sampleController = require('../controllers/sampleController')

sampleRoutes.post('/search', sampleController.search)
sampleRoutes.get('/:id', sampleController.getOne)

module.exports = sampleRoutes