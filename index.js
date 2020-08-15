const express = require('express');
const http = require('http');
const fetch = require('node-fetch');


var app = express();
var apiKey = '9288ccad763153a0cc47150b17b0535d';
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine','ejs');
app.use(express.static('public'));
var port = 3000;
app.get('/',(req,res) =>{
   res.render('home',{
       city : null,
       degree : null
   });
});

app.post('/',urlencodedParser,(req,res) =>{
   var city = req.body.city;
   const urlParams = {
    host : 'http://api.openweathermap.org',
    path : '/data/2.5/weather?units=metric&q='+city+'&appid='+apiKey
};
    const url = urlParams.host+urlParams.path;
    try {
        fetch(url)
        .then(res =>res.json())
        .then(data => {
              if(data.cod != 200){
                  res.render('home',{city : 'city not foubd', degree :null})
              }
              else{
                  res.render('home',{city: city, degree: data.main.temp})
              }
            
        });
    } catch (error) {
        
    }


   
   
  
}),
app.get('/test',(req,res)=>{
    const urlParams = {
        host : 'http://api.openweathermap.org',
        path : '/data/2.5/weather?units=metric&q=rabat&appid='+apiKey
    };
    const url = urlParams.host+urlParams.path;
   try {
    fetch(url)
    .then(res =>res.json())
    .then(data => console.log(data.main.temp));
   } catch (error) {
       console.log(error);
   }
})

app.listen(port,()=>{
    console.log('server run in port'+port);
})

function getApiData(city,apiKey){
    const urlParams = {
        host : 'http://api.openweathermap.org',
        path : '/data/2.5/weather?units=metric&q='+city+'&appid='+apiKey
    };
    const url = urlParams.host+urlParams.path;
    http.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
    body += data;
    });
    res.on("end", () => {
    body = JSON.parse(body);
    console.log('data : '+body.main.temp);
    return body;
    }).on('error', (e) =>{
        console.log('got error'+e.message);
    });
    });
}