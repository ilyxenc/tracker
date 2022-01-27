const mongoose = require('mongoose')

const { Schema } = mongoose

const passportLocalMogoose = require('passport-local-mongoose')

const User = new Schema({})

User.plugin(passportLocalMogoose)

module.exports = mongoose.model('user', User)