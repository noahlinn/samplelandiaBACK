require('dotenv').config()
const models = require('../models')
const userController = {}
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

userController.create = async (req,res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const newUser = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        
        const encryptedId = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET)
        console.log(res.data)
        // res.json({message: 'Signed up', userId: encryptedId, userName: newUser.name, userEmail: newUser.email})
        res.json({encryptedId, newUser})
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }
}

userController.login = async (req,res) => {
    try {
        const user = await models.user.findOne({
            where:{
                email: req.body.email
            }
        })
        if (bcrypt.compareSync(req.body.password, user.password)){
            const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
            // res.json({message: 'login successful', userId: encryptedId, userName: user.name, userEmail: user.email})
            res.json({user, encryptedId})
        }
        else{
            res.status(401).json({message: 'login failed'})
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }
}

userController.verify = async (req, res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        
        const user = await models.user.findOne({
            where:{
                id: decryptedId.userId
            }
        })
        if(user){
            res.json({user})
        }
        else{
            res.status(404).json({message: 'user not found'})
            console.log(error)
        }
    } catch (error) {
        res.json({error})
        console.log(error)
    }
}

userController.getUserInfo = async (req, res) => {
    try{
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })
       
        res.json({
            user: user
        })    
    }
    catch (error) {
        res.json({
            error
        })
    }
}

userController.getSamples = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where:{
                id: req.headers.authorization
            }
        })
        const samples = await user.getUserCreatedSamples()
        res.send(samples)
    } catch (error) {
        
    }
}

userController.saveSample = async (req, res) => {
    try {
        let [sample, create] = await models.savedSample.findOrCreate({
            where: {
                sampleId: req.body.sampleId,
                sampleName: req.body.sampleName
            }
        })
        console.log(sample)
        
        const user = await models.user.findOne({
            where:{
                id: req.headers.authorization
            }
        })
        console.log(user)
        await user.addSavedSample(sample)
        
        res.send({user, sample})
    } catch (error) {
        res.send(error)
    }
}

userController.getSaved = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where:{
                id: req.headers.authorization
            }
        })
        const favoirteSample = await user.getSavedSamples()
        res.send({favoirteSample})
    } catch (error) {
        res.send(error)
    }
}

userController.deleteSave = async (req, res) => {
    try {
        let sample = await models.savedSample.findOne({
            where:{
                sampleId: req.params.sampleId
            }
        })
        const user = await models.user.findOne({
            where:{
                id: req.headers.authorization
            }
        })
        console.log(user)
        await user.removeSavedSample(sample)
        res.send(sample)
    } catch (error) {
        res.send(error)
    }
}


module.exports = userController



