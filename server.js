const express = require('express');
const config = require('./config/config.js')

const app = express();
const port = config.port;

//Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
    next();
});

//Middlewares
app.use(express.json());

//routes
app.use('/holidays', require('./routes/holidays.js'));
app.use('/countries', require('./routes/countries.js'));

//Start Server
app.listen(port, () =>{
    console.log(`Server listening at port: ${port}`);
});

//test route
app.get('/', (req,res) => {
    res.send("You are connected to Backend!");
});
