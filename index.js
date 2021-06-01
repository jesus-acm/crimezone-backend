const express = require('express');
const cors = require('cors')
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/file', require('./routes/file'));


app.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);

    console.log('Servidor corriendo en el puerto: 3000');
});