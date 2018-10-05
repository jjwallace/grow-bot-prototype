// Initialize a socket
var socket = io();
var updateSpeed = 500; //milliseconds
var gauges = [];
var graphs = [];

function createGauge(name, label, min, max)	{
    var config = {
        size: 220,
        label: label,
        min: undefined != min ? min : 0,
        max: undefined != max ? max : 100,
        minorTicks: 5,
        transitionDuration: 500
    }			
    var range = config.max - config.min;
    config.yellowZones = [{ from: config.min + range*0.75, to: config.min + range*0.9 }];
    config.redZones = [{ from: config.min + range*0.9, to: config.max }];

    gauges[name] = new Gauge(name + "GaugeContainer", config);
    gauges[name].render();
}

function createGraph(name, label, min, max)	{
	
    var config = {
        size: 200,
        label: label,
        min: undefined != min ? min : 0,
        max: undefined != max ? max : 100,
        minorTicks: 5
    }
				
    var range = config.max - config.min;

    graphs[name] = new Graph(name + "GraphContainer", config);
    graphs[name].render();
}

function createGauges(){
    // Create gauge with the default range 		
    createGauge("humidity", "HUMIDITY");
    createGauge("temperature", "TEMP");	
    
    createGraph("humidity", "HUMIDITY");
    createGraph("temperature", "TEMP");	
}
                    
function updateGauges()	{
    //SEND MESSAGE TO SERVER   
    socket.emit('server', {});
    
    //RECEIVE MESSAGE FROM SERVER
    socket.on('server', function(data){           
        var temperature = data.temperature;   
        var humidity = data.humidity;  
        
        for (var key in gauges){  
            if (key == "humidity") {
                gauges[key].redraw(humidity); 
            }
            if (key == "temperature") {
                gauges[key].redraw(temperature); 
            }
        } 		
        
        for (var key in graphs){  
            if (key == "humidity") {
                graphs[key].redraw(humidity); 
            }
            if (key == "temperature") {
                graphs[key].redraw(temperature); 
            }
        }
    })         
}
			
function initialize(){
  createGauges();
  setInterval(updateGauges, updateSpeed);
}