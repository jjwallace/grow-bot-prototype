var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var os = require('os');
//var cpu = require('./anotherClass.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('js'));
app.use(express.static('css'));

var data;

io.on('connection', function (socket) {
    console.log("A New User Connected");
    
    //DATA REQUEST
    socket.on('server', function () {
        io.emit('server', data);
    });
});

http.listen(8000, function () {
    console.log('listening on *:8000');
});

console.log('SERVER ONLINE!');

setInterval(myTimer, 100);

function myTimer() {
    data = publishTelemetry();
    console.log(data);
}

const minTemperature = 17.5,
    maxTemperature = 30,
    minHumidity = 12,
    maxHumidity = 90,
    multiplier = 1;

// Initialization of temperature and humidity data with random values
var data = {
    temperature: minTemperature + (maxTemperature - minTemperature) * Math.random(),
    humidity: minHumidity + (maxHumidity - minHumidity) * Math.random()
};

var counter = 0;
var counterMax = 60;

function publishTelemetry() {
    var modifier = 0;
    var tempMod = -3;
    counter ++;
    if(counter > counterMax){
        counter = 0;
        modifier = 40;
    }
    data.temperature = genNextValue(data.temperature, minTemperature, maxTemperature) + modifier/tempMod;
    data.humidity = genNextValue(data.humidity, minHumidity, maxHumidity) + modifier;
    
    if(data.humidity > 50){data.humidity -= 1}
    if(data.temperature < 70){data.temperature += 0.3}
    
    return data;
}

// Generates new random value that is within 3% range from previous value
function genNextValue(prevValue, min, max) {
    var value = prevValue + ((max - min) * (Math.random() - (0.5*multiplier)) * (0.03*multiplier));
    value = Math.max(min, Math.min(max, value));
    return Math.round(value * 10) / 10;
}