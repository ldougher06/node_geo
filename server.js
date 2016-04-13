#!/usr/bin/env node
'use strict'

const chalk = require('chalk')
const bodyParser = require('body-parser')
const path = require('path'); // included with node but needs to be required
const express = require('express')
const app = express()
const pg = require('pg')

const routes = require('./routes/index')

const PORT = process.env.PORT || 3000;

// const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://localhost:5432/todos';

// const db = new pg.Client(POSTGRES_URL);


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'public')))

app.locals.title = 'LD PSQL TODOS';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(chalk.bold.black.bgWhite(`*******  Server listening on PORT: ${PORT}  ******`))
});

// db.connect((err) => {

//   if(err) throw err;

//   app.listen(PORT, () => {
//     console.log(chalk.bold.black.bgWhite(`*******  Server listening on PORT: ${PORT}  ******`))
//   });

// });


