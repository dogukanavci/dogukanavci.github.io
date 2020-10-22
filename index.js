const express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
const request=require('request');


//required if using body-parser
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index',{data: null,imgurl: null,other: null, error: null})
});

app.post('/', function(req, res){
    var pokemon = req.body.pokemon.toLowerCase();
    let url = 'https://pokeapi.co/api/v2/pokemon-species/'+ pokemon +'/';
    request(url, function (err, response, body) {
    if(response.body == "Not Found"){
      res.render('index', {data: null,imgurl: null, other: null, error: 'You wrote an incorrect pokemon name'});
    } else {
      let data;
      if (response.body != "Not Found") {
        data = JSON.parse(body);
      }
      else {
        res.render('index', {data: null,imgurl: null, other: null, error: 'You wrote an incorrect pokemon name'});
      }
      let imgurl;
      try{
        imgurl = 'http://placekitten.com/100/100';
      }
      catch(e){
        console.log(e);
        imgurl = 'http://placekitten.com/100/100';
      }
      let flavortexts = data.flavor_text_entries;
      let flavortext = '';
      for (let o of flavortexts) {
        if (o.language.name == "en") {
            flavortext += o.flavor_text;
        }
      }
      let color, evolvesfrom,habitat,growthrate,shape,dataText = '';
      if (data.color) {
        color = ' It is colored ' + data.color.name;
        dataText += color;
      }
      if (data.evolves_from_species) {
       evolvesfrom = '\n and it evolves from ' + data.evolves_from_species.name;
       dataText += evolvesfrom;
      }
      if (data.habitat) {
       habitat = '\n . Its habitat is ' + data.habitat.name;
       dataText += habitat;
      }
      if (data.growth_rate) {
       growthrate = '\n . Its growth rate is ' + data.growth_rate.name;
       dataText += growthrate;
      }
      if (data.shape) {
       shape = '\n . It is shaped like a ' + data.shape.name;
       dataText += shape;
      }
      res.render('index', {data: flavortext,imgurl: imgurl,other: dataText, error: null});
    }
  });
})
app.listen(3000, function(){
    console.log('app is running on port 3000')
})