var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('Welcom to trading comidity');
});

module.exports = router;
