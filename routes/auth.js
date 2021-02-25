const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register

router.post(
    '/register',
    [
        check('email','Incorrect email').isEmail(),
        check('password','Minimal length of password is 6 symbols')
            .isLength({min: 6}),
    ],
    async (req, res) =>{
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: "Incorrect registration data", ok: false})
            }

            const {email, password, name} = req.body


            const candidate = await User.findOne({email: email})

            if (candidate) {
                return res.status(400).json({message: "User is already exists", ok: false})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword, name})
            await user.save()
            res.status(201).json({message: "User successfully created", ok: true})
        } catch (e) {
            res.status(500).json({message: "Something went wrong, try again", ok: false})
        }
    })

// /api/auth/login

router.post(
    '/login',
    [
        check('email','Incorrect email').normalizeEmail().isEmail(),
        check('password','Enter password').exists()

    ],

    async (req, res) =>{
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(({errors: errors.array(), message: "Incorrect data", ok: false}))
            }
            const {email, password} = req.body

            const user = await User.findOne({email: email})

            if(!user) {

                return res.status(400).json({ message: "Incorrect data", ok: false})
            }
            const isMatch =  await bcrypt.compare(password, user.password)

            if(!isMatch) {

                return res.status(400).json({ message: "Incorrect data", ok: false})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id, ok: true})
        } catch (e) {
            res.status(500).json({message: "Something went wrong, try again", ok: false})
        }

    })

//api/auth/me
router.post(
    '/me',
    async (req, res) =>{
        try {

            const {userId} = req.body

            const {name} = await User.findById(userId)

            res.json({  name: name, ok: true})
        } catch (e) {
            res.status(500).json({message: "Something went wrong, try again", ok: false})
        }

    })


module.exports = router
