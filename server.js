const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const config = require('config')

const PORT = process.env.PORT || 5000


app.use(express.json({extended: true}))
app.use('/api/', require('./routes/auth')) //импортируем роуты
app.use('/api/', require('./routes/stat'))


if (process.env.NODE_ENV === 'production') { //статика для продакшена
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve( __dirname, 'client', 'build', 'index.html'))
    } )

}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        })
        app.listen(PORT, () => console.log(`Server running on port ${PORT}!!!`))
    } catch (e) {
        console.log('Server ERROR', e.message)
        process.exit(1)
    }
}

start()

