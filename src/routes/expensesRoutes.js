const expense = require('../models/expense');

module.exports = (app) => {

    app.get('/expenses', (req, res) => {
        expense.getExpenses((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/expenses', (req, res) => {
        const expenseData = {
            id: null,
            category: req.body.category,
            descripcion: req.body.description,
            amount: req.body.amount,
            created_at: null,
            updated_at: null
        };

        expense.insertExpense(expenseData, (err, data) => {
            if (data && data.insertId) {
                res.status(200).json({
                    success: true,
                    msg: 'Expense inserted',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error - expense not inserted'
                });
            }
        });

    });

    app.put('/expenses/:id', (req, res) => {
        const expenseData = {
            id: req.params.id,
            category: req.body.category,
            descripcion: req.body.description,
            amount: req.body.amount,
            created_at: null,
            updated_at: null
        };

        expense.updateExpense(expenseData, (err, data) => {
            if (data && data.success) {
                res.status(200).json({
                    success: true,
                    msg: 'Expense updated',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error - expense not updated'
                });
            }
        });
    })
}




// dijo que habia otra forma de hacerlo (la de arriba), no se si esta de abajo funciona

// const express = require('express');
// const router = express.Router(); // para poder definir rutas en el servidor

// router.get('/', (req, res) => {
//     res.json([]);
// });

// // se exporta el router
// module.exports = router;