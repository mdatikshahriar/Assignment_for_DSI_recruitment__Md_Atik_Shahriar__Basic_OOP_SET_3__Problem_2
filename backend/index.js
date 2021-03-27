const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/route.js');
const bodyParser = require('body-parser');

//Database
const db = require('./config/database');
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

//Middleware
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));