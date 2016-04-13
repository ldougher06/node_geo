'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');
const pg = require('pg');
const connectionString = require(path.join(__dirname, '../', 'config'));

router.get('/', (req, res, next) => {
  res.render(path.join(__dirname, '../', 'views/index'));
});

router.post('/todos', (req, res) => {
  const results = [];

  const data = {
    text: req.body.text,
    complete: false
  }

  pg.connect(connectionString, (err, client, done) => {
    // handle connection errors
    if(err) throw err;

    // inserts data
    client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);
    console.log(client)
    // selects data
    const selectQuery = client.query("SELECT * FROM items ORDER BY id ASC");

    // brings results back one row at a time
    selectQuery.on('row', (row) => {
      results.push(row);
    });

    selectQuery.on('end', () => {
      done();
      return res.json(results);
    });

  });

});

router.get('/todos', (req, res) => {
  const results = [];

  pg.connect(connectionString, (err, client, done) => {

    if(err) throw err;

    const selectQuery = client.query("SELECT * FROM items ORDER BY id ASC");

    selectQuery.on('row', (row) => {
      results.push(row);
    });

    selectQuery.on('end', () => {
      done();
      return res.json(results);
    });

  });

});

router.put('/todos/:todo_id', function(req, res) {

    const results = [];

    // grab data from the URL parameters
    const id = req.params.todo_id;

    // grab data from http request
    const data = {text: req.body.text, complete: req.body.complete};

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // select Data
        const selectQuery = client.query("SELECT * FROM items ORDER BY id ASC");

        // brings results back one row at a time
        selectQuery.on('row', function(row) {
            results.push(row);
        });

        // after all data is returned, close connection and return results
        selectQuery.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

router.delete('/todos/:todo_id', function(req, res) {

    const results = [];

    // grab data from the URL parameters
    const id = req.params.todo_id;


    // get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // select Data
        const selectQuery = client.query("SELECT * FROM items ORDER BY id ASC");

        // bring results back one row at a time
        selectQuery.on('row', function(row) {
            results.push(row);
        });

        // after all data is returned, close connection and return results
        selectQuery.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

module.exports = router;
console.log('** In ROUTES index.js **')
