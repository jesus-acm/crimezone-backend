const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/api/file', require('./routes/file'));


app.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);

    console.log('Servidor corriendo en el puerto: 3000');
});