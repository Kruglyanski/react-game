const {Router} = require('express')
const router = Router()
const Stat = require('../models/Stat')


//api/count
router.post(
    '/count',
    async (req, res) =>{
        console.log(req.body)
        try {

            const stat = new Stat({
                count: req.body.count,
                date: Date.now(),
                userName: req.body.name || 'Без авторизации'
            })
            await stat.save()
            res.status(201).json({message: "Счет успешно записан", ok: true})
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте ещё", ok: false})
        }

    })

// /api/getrecords
router.get(
    '/getrecords',
    async (req, res) =>{

        try {
            const records = await Stat.find({}).sort({ count: -1 }).limit(10)
            console.log(records)
            res.json(records)
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте ещё", ok: false})
        }
    })
module.exports = router