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

        this.config.greenColor = configuration.greenColor || "#109618";
        this.config.yellowColor = configuration.yellowColor || "#FF9900";
        this.config.redColor = configuration.redColor || "#DC3912";

        this.config.transitionDuration = configuration.transitionDuration || 500;

        this.tempData = [];


    }

    var height = 200;
    var width = 500;
    
    var margin = {top: 20, right: 20, bottom: 20, left: 40};
    
    this.render = function () {
        this.svg = d3.select("#" + this.placeholderName)
            .append("svg")
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("fill", "pink");
            
        var n = 40,
        random = d3.randomNormal(0, 100),
        data = d3.range(n).map(random);
        
        var g = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var parseTime = d3.timeParse("%d-%b-%y");

        var x = d3.scaleLinear()
            .domain([0, n - 1])
            .range([0, width]);
        var y = d3.scaleLinear()
            .domain([-1, 1])
            .range([height, 0]);

        this.line = d3.line()
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
          data.push(random());
          // Redraw the line.
          d3.select(this)
                .attr("d", this.line)
                .attr("transform", null);
          // Slide it to the left.
          d3.active(this)
                .attr("transform", "translate(" + x(-1) + ",0)")
                .transition()
                .on("start", tick);
          // Pop the old data point off the front.
          data.shift();
        }
        

       // this.redraw(this.config.min, 0);
    }
    
    
    
    
    
    
    

    this.redraw = function (value, transitionDuration) {
        // Push a new data point onto the back.
        this.tempData.push(value);

        

//        // Redraw the line.
//        d3.select(this)
//          .attr("d", this.line)
//          .attr("transform", null);
//        // Slide it to the left.
//        d3.active(this)
//          .attr("transform", "translate(" + x(-1) + ",0)")
//        .transition()
//          .on("start", tick);
//        // Pop the old data point off the front.
//        this.tempData.shift();
        
        
        
        
        
        
        
        
        
        
        
//        this.tempData.push(value);
//        if (this.tempData.length > 35){
//            this.tempdata = this.tempData.splice(0, 1);
//        }
//        
//        //init
//        var rects = this.svg.selectAll("rect").data(this.tempData);
//        //enter
//        rects.enter().append("rect")
//            .attr("width", 5)
//            .attr("x", function (d, i) {
//                return i * 6;
//            })
//            .attr("y", function (d) {
//                return 100 - d;
//            })
//            .attr("height", function (d) {
//                return d;
//            })
//        // update
//        rects.transition().
//        duration(200)
//            .attr("x", function (d, i) {
//                return i * 6;
//            })
//            .attr("y", function (d) {
//                return 100 - d;
//            })
//            .attr("height", function (d) {
//                return d;
//            })
//        // exit
//        rects.exit().remove();
    }

    // initialization
    this.configure(configuration);
}
