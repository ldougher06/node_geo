#!/usr/bin/env node
'use strict'

const chalk = require('chalk')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const pg = require('pg')
const request = require('request')

const routes = require('./routes/index')

const PORT = process.env.PORT || 3000

const POSTGRES_URL = process.env.POSTGRES_URL
  || 'postgres://localhost:5432/node_geo'

const db = new pg.Client(POSTGRES_URL)

app.set('view engine', 'jade')

app.use(express.static('public'))

app.locals.title = 'LD Node PSQL GEO';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(routes);

app.get('/', (req, res) => {
  res.render('index')
})

db.connect((err) => {
  if(err) throw err;

  app.listen(PORT, () => {
    console.log(chalk.bold.black.bgWhite(`*******  Server listening on PORT: ${PORT}  ******`))
  })
})

