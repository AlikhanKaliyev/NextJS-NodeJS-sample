require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const {corsOptionsDelegate} = require('./config/cors');

app.use(express.urlencoded());
app.use(express.json());
app.use(require("cookie-parser")());
app.use(cors(corsOptionsDelegate));
app.use(require("./routes"))
app.use('/public', express.static('public'));
app.listen(process.env.PORT,() => console.log(`Localhost:${process.env.PORT}`));
