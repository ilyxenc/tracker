const { Router } = require('express')

const Transaction = require('../models/Transaction')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        if (!transactions) {
            throw new Error('No transactions')
        }

        res.status(200).json(transactions)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const { value, date } = req.body

    const newTransaction = new Transaction({ value, date })

    try {
        const transaction = await newTransaction.save()
        if (!transaction) {
            throw new Error('Transactions saving error')
        }

        res.status(200).json(transaction)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const transaction = Transaction.findById(id)
        if (!transaction) {
            throw new Error('No transactions found')
        }

        const removed = await transaction.remove()

        if (!removed) {
            console.log('Transaction deleting problems')
        }

        res.status(200).json({ id })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = router