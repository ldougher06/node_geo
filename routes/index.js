'use strict';

const models  = require('../models/');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.User.findAll({
    include: [ models.Task ]
  }).then((users) => {
    res.render('index', {
      title: 'What Technologies Would You Like To Discuss?',
      users: users
    });
  });
});

router.get('/auth', (req, res) => {
  res.render('auth');
})

module.exports = router;
