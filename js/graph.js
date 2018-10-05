function Graph(placeholderName, configuration) {
    this.placeholderName = placeholderName;

    var self = this; // for internal d3 functions

    this.configure = function (configuration) {
        this.config = configuration;

        this.config.size = this.config.size * 1.0;

        this.config.cx = this.config.size / 2;
        this.config.cy = this.config.size / 2;

        this.config.min = undefined != configuration.min ? configuration.min : 0;
        this.config.max = undefined != configuration.max ? configuration.max : 100;
        this.config.range = this.config.max - this.config.min;

        this.config.transitionDuration = configuration.transitionDuration || 500;

    }
    
    var data = [];
    var currentData = 30;

    var height = 200;
    var width = 800;
    
    var margin = {top: -20, right: 20, bottom: 30, left: 40};
    
    this.render = function () {
        
        var n = 40,
        random = d3.randomUniform(31, 33),
        data = d3.range(n).map(random);
        
        this.svg = d3.select("#" + this.placeholderName)
            .append("svg")
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("fill", "pink");
            
        var g = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var parseTime = d3.timeParse("%d-%b-%y");

        var x = d3.scaleLinear()
            .domain([0, n - 1])
            .range([0, width]);
        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        var line = d3.svg.line()
            .interpolate("cardinal")   
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });
        
        g.append("defs").append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", width)
            .attr("height", height);
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.axisBottom(x));
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));
        g.append("g")
            .attr("clip-path", "url(#clip)")
          .append("path")
            .datum(data)
            .attr("class", "line")
          .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .on("start", tick);
        
        function tick() {
          // Push a new data point onto the back.
          data.push(currentData);
            
            console.log(currentData);
          // Redraw the line.
          d3.select(this)
                .attr("d", line)
                .attr("transform", null);
            
          var duration = 1000;
            
          var transition = d3
                    .transition() 
                    .duration(duration)
                    .ease(d3.easeLinear);
            
          d3.select(".xaxis")
                .transition(transition)
                .call(d3.axisBottom(x));
            
          // Slide it to the left.
          d3.active(this)
                .attr("transform", "translate(" + x(-1) + ",0)")
                .transition()
                .on("start", tick);
          // Pop the old data point off the front.
          data.shift();
        }
        
    }

    this.redraw = function (value, transitionDuration) {
        currentData = value;
    }

    // initialization
    this.configure(configuration);
}
