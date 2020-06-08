const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB Config
require('./config/db');

const app = express();

//Using self-defined model poll.js as API
const poll = require('./routes/poll');
app.use('/poll',poll);

//Set public folder
app.use(express.static(path.join(__dirname,'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Enable Cors
app.use(cors());

const port = process.env.PORT || 4000;

//Start server
app.listen(port, '0.0.0.0', ()=> console.log(`fwkefaqekfenfkq Server started on ${port}`));