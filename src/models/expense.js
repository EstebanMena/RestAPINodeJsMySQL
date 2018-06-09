const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apirestmysql'
});

let expenseModel = {};

expenseModel.getExpenses = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM expenses ORDER BY id',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

expenseModel.insertExpense = (expenseData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO expenses SET ?', expenseData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId' : result.insertId
                    });
                }
            }
        );
    }
}

expenseModel.updateExpense = (expenseData, callback) => {
    if (connection) {
        const sql = `
            UPDATE expenses SET
            category = ${connection.escape(expenseData.category)},
            descripcion = ${connection.escape(expenseData.descripcion)},
            amount = ${connection.escape(expenseData.amount)}
            WHERE id = ${connection.escape(expenseData.id)}
        `;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    'success': true
                });
            }
        });
    }
}

module.exports = expenseModel;