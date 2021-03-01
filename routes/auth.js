const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/register

router.post(
    '/register',
    [
        check('email','Некорректный email').isEmail(),
        check('password','Минимальная длина пароля 6 символов')
            .isLength({min: 6}),
    ],
    async (req, res) =>{
        console.log(req.body)
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: "Некоректные данные", ok: false})
            }

            const {email, password, name} = req.body


            const candidate = await User.findOne({email: email})

            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким email уже существует", ok: false})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword, name})
            await user.save()
            res.status(201).json({message: "Пользователь успешно создан", ok: true})
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте ещё", ok: false})
        }
    })

// /api/login

router.post(
    '/login',
    [
        check('email','Некорректный email').normalizeEmail().isEmail(),
        check('password','Введите пароль').exists()

    ],

    async (req, res) =>{
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(({errors: errors.array(), message: "Некорректные данные", ok: false}))
            }
            const {email, password} = req.body

            const user = await User.findOne({email: email})

            if(!user) {

                return res.status(400).json({ message: "Некорректные данные", ok: false})
            }
            const isMatch =  await bcrypt.compare(password, user.password)

            if(!isMatch) {

                return res.status(400).json({ message: "Некорректные данные", ok: false})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id, name:user.name, ok: true})
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте ещё", ok: false})
        }

    })




module.exports = router
