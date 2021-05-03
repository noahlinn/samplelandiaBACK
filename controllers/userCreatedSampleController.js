const models = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

userCreatedSampleController = {}

userCreatedSampleController.create = async (req, res) => {
    try {
        const [sample, create] = await models.userCreatedSample.findOrCreate({
            where: {
                name: req.body.name,
                description: req.body.description.description,
                file: req.body.file
            }
        })
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        await user.addUserCreatedSample(sample)
        res.send(sample)
    } catch (error) {
        res.json(error)
    }
}

userCreatedSampleController.getOne = async (req, res) => {
    try {
        const oneSample = await models.userCreatedSample.findOne({
            where: {
                id: req.params.id
            }
        })
        res.send(oneSample)
    } catch (error) {
        res.send(error)
    }
}

userCreatedSampleController.delete = async (req, res) => {
    try {
        const kill = await models.userCreatedSample.findOne({
            where:{
                id: req.params.id
            }
        })
        let death = await kill.destroy()
        res.send(death)
    } catch (error) {
        res.send(error)
    }
}


userCreatedSampleController.getAll = async (req, res) => {
    try {
        const all = await models.userCreatedSample.findAll({where:{
            name:{
                [Op.iLike]:`%${req.params.name}%`
            }
        }})
        res.json(all)
    } catch (error) {
        res.send(error)
    }
}

userCreatedSampleController.edit = async (req, res) => {
    try {
        const updates = req.body
        const sample = await models.userCreatedSample.findOne({where:{
            id: req.params.id
        }})
        const updatedSample = await sample.update(updates)
        res.json(updatedSample)
    } catch (error) {
        res,json(error)
    }
}

module.exports = userCreatedSampleController