const router = require('express').Router()
const Person = require('../models/person')

router.get('/', async (req, res)=>{
    const people= await Person.find()
    res.json(people)
})

router.get('/id/:id', async(req,res)=>{
    const { id }= req.params
    const person = await Person.findById(id)
    res.json(person)
})

router.get('/name/:name', async (req,res)=>{
    const { name } = req.params
    const people = await Person.find({ name : name})
    res.json(people)
})

router.post('/', async (req,res)=>{
    try{
        const person = await new Person(req.body).save()
        res.json(person)
    }catch(error){
        console.log(error)
        res.json({message: 'error creating user'})
    }
    
})
router.delete('/:id', async (req,res)=>{
    const { id }= req.params
    await Person.findByIdAndDelete(id)
    res.json({message: 'user deleted'})
})
router.put('/:id', async(req,res)=>{
    const{ id }= req.params
    await Person.findByIdAndUpdate(id, req.body)
    res.json({message: 'user updated'})
})


module.exports = router