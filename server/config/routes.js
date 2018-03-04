const router = require('express').Router();
const stocksController = require('../controllers/stocks');

module.exports = router
  .get('/:tags', stocksController.index)
  .get('/detail/:tag', stocksController.details)
