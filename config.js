module.exports = {
    port: process.env.PORT || 8000,
    mongoURI: process.env.MONGO_URI || 'mongodb+srv://admin:6axWHfwZCg%40dHWm@cluster0.ndfmf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}

// to set process.env.VARIABLE: export VARIABLE='' ///// process.env.MONGO_URI || 