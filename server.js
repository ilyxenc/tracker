
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const transactionRoutes = require('./routes/transactions')
const { port, mongoURI } = require('./config')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log(err))

app.use('/api/transactions', transactionRoutes)

app.get("/", (req, res) => {
    res.send('hi')
})

app.listen(port, () => console.log('Express is running at port ' + port))