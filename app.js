// var http = require('http');
 
// const options = new URL('');

// const req = http.request(options, (res) => {
//   console.log(res);
// });
const argv = require('yargs').argv;
const http = require("http");

var city = argv.c || 'Errachidia';
var apiKey = '9288ccad763153a0cc47150b17b0535d';

const urlParams = {
    host : 'http://api.openweathermap.org',
    path : '/data/2.5/weather?q='+city+'&appid='+apiKey
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
console.log(body.main.temp);
}).on('error', (e) =>{
    console.log('got error'+e.message);
});
});