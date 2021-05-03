const { default: axios } = require('axios')
// const models = require('../models')
const sampleController = {}
const apiKey = 'nAtLaYjGvJ7EOKLR4d4hnswp0KVSFpAsE8TugBoH'
const api = ''
// sampleController.getAll = async (req, res) => {
//     try {
//         let query = await req.body.query
//         let response = await axios.get(`https://freesound.org/apiv2/search/text/?query=${query}&token=${apiKey}`)
//         res.send(response)
//     } catch (error) {
//         res.send(error)
//     }
// }

sampleController.search = async (req, res) => {
    try {
        let query = await req.body.query.query
        let page = await req.body.page
        let response = await axios.get(`https://freesound.org/apiv2/search/text/?query=${query}&token=${apiKey}&page=${page}`)
        res.send(response.data)
    } catch (error) {
        res.send(error)
    }
}
sampleController.getOne = async (req, res) => {
    try {
        let id = req.params.id
        let response = await axios.get(`https://freesound.org/apiv2/sounds/${id}/?token=${apiKey}`)
        res.send(response.data)
    } catch (error) {
        res.send(error)
    }
}



module.exports = sampleController