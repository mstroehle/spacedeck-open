"use strict";

const config = require('config');

const redis = require('../helpers/redis');
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const mailer = require('../helpers/mailer');
const _ = require('underscore');

const db = require('../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuidv4 = require('uuid/v4');

router.get('/', (req, res) => {
  res.render('index', { title: 'Spaces' });
});

router.get('/ping', (req, res) => {
  res.status(200).json({"status": "ok"})
});

router.get('/spaces', (req, res) => {
  res.render('spacedeck', { title: 'Spaces' });
});

router.get('/not_found', (req, res) => {
  res.render('not_found', { title: 'Spaces' });
});

router.get('/confirm/:token', (req, res) => {
  res.render('spacedeck', { title: 'Space' });
});

router.get('/folders/:id', (req, res) => {
  res.render('spacedeck', {});
});

router.get('/signup', (req, res) => {
  res.render('spacedeck', {});
});

router.get('/accept/:id', (req, res) => {
  res.render('spacedeck', {});
});

router.get('/password-reset', (req, res) => {
  res.render('spacedeck', { title: 'Signup' });
});

router.get('/password-confirm/:token', (req, res) => {
  res.render('spacedeck', { title: 'Signup' });
});

router.get('/de/*', (req, res) => {
  res.redirect("/t/de");
});

router.get('/de', (req, res) => {
  res.redirect("/t/de");
});

router.get('/fr/*', (req, res) => {
  res.redirect("/t/fr");
});

router.get('/fr', (req, res) => {
  res.redirect("/t/fr");
});

router.get('/en/*', (req, res) => {
  res.redirect("/t/en");
});

router.get('/en', (req, res) => {
  res.redirect("/t/end");
});

router.get('/account', (req, res) => {
  res.render('spacedeck');
});

router.get('/login', (req, res) => {
  res.render('spacedeck');
});

router.get('/logout', (req, res) => {
  res.render('spacedeck');
});

router.get('/contact', (req, res) => {
  res.render('public/contact');
});

router.get('/about', (req, res) => {
  res.render('public/about');
});

router.get('/terms', (req, res) => {
  res.render('public/terms');
});

router.get('/privacy', (req, res) => {
  res.render('public/privacy');
});

router.get('/t/:id', (req, res) => {
  res.cookie('spacedeck_locale', req.params.id, { maxAge: 900000, httpOnly: true });
  var path = "/";
  if (req.query.r=="login" || req.query.r=="signup") {
    path = "/"+req.query.r;
  }
  res.redirect(path);
});

router.get('/s/:token', (req, res) => {
  var token = req.params.token; 
  if (token.split("-").length > 0) {
    token = token.split("-")[0];
  }

  db.Space.findOne({where: {"edit_hash": token}}).then(function (space) {
    if (space) {
      if (req.accepts('text/html')){
	      res.redirect("/spaces/"+space._id + "?spaceAuth=" + token);
      } else {
	      res.status(200).json(space);
      }
    } else {
      if (req.accepts('text/html')) {
	      res.status(404).render('not_found', { title: 'Page Not Found.' });
      } else {
	      res.status(404).json({});
      }
    }
  });
});

router.get('/spaces/:id', (req, res) => {
  res.render('spacedeck', { title: 'Space' });
});

module.exports = router;
