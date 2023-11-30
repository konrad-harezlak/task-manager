const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const pool = require('./pool'); 
require('dotenv').config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);

app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("Server works on "+port);
});
