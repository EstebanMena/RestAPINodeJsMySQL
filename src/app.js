const express = require('express');
const app = express();
const morgan = require('morgan'); // es para poder ver las peticiones que llegan al servidor a través de la consola
const bodyParser = require('body-parser'); // para poder entender las peticiones POST

// settings express
app.set('port', process.env.PORT || 3000);

// middlewares (son funciones que se ejecutan cada vez que se recibe una petición)
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
require('./routes/expensesRoutes')(app); // se ejecuta ahí mismo, mandando app

// static files irían aquí


app.listen(app.get('port'), () => {
    console.log('server started');
});