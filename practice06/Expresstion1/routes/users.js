var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(req.app.get('port'));
});

router.get('/info', function(req, res, next) {
  // res.send('User info');
  // res.send({title:'eeee'});
  res.send(req.url);
});

router.get('/info/:id', function(req, res, next) {
  res.send(`User info id=${req.params.id}`);
});
module.exports = router;
