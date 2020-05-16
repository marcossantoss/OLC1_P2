const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports

const hace_analisis= require('./routes/hacer_analisis');

//settings
app.set('port', 3000);

//cors los cuales se pueden hacer mediante requiare o aqui se pueden defininir de una vez
app.use((req, res, next) => {
  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPT"IONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   
    
    next();
});

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use routes


app.use(hace_analisis);



//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})
