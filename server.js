#!/usr/bin/env node
'use strict'

const chalk = require('chalk')
const bodyParser = require('body-parser')
const path = require('path'); // included with node but needs to be required
const express = require('express')
const app = express()
const models = require('./models/')

const routes = require('./routes/')
const users = require('./routes/users')

const PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'public')))

app.locals.title = 'LD SQLite TODOS';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// no stacktraces leaked to user unless in development environment
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: (app.get('env') === 'development') ? err : {}
//   });
// });

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.blue('Node.js server started. ') + chalk.black.bold.bgYellow(`Listening on PORT ${PORT}`));
  });
});

module.exports = app;



