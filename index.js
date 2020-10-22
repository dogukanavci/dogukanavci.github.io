var express = require('express');
var app = express();
var path = require('path');
router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});


app.use('/', router);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});