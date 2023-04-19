
var points = [];
i=0
while (i<100) {
  var x = Math.random() * 475;
  var y = Math.random() * 500;
  points.push({ x: x+25, y: y });
  i+=1  ;
}

const svg=d3.select(".fig1")
            .append("svg")
            .attr("width", 600)
            .attr("height", 600)

svg.selectAll("circle")
   .data(points)
   .enter().append("circle")
   .attr("cx", function(d) { return d.x; })
   .attr("cy", function(d) { return d.y; })
   .attr("r", 2)
   .attr("fill", "black");

var x = d3.scaleLinear()
          .domain([0, 500])
          .range([0, 500]);
var y = d3.scaleLinear()
          .domain([0, 500])
          .range([500, 0]);

svg.append("g")
    .attr("transform", "translate(" + 25 + "," + 500 + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", "translate(" +25 + "," + 0 + ")")
    .call(d3.axisLeft(y));





d3.csv("titanic.csv").then(function(data) {

      var gr = d3.rollup(data,
        g => g.length,
        d =>  {

            if (d.Age < 20){return "Under 20";
                 } else if (d.Age < 50){ return "between 20-50";
                 } else if (d.Age < 70) {return "between 50-70";
                 }else if(d.Age>=70){
                                         return ">70";}
        });

      var age_group = Array.from(gr, ([year, number]) => ({age: year, amount: number}));
      console.log(age_group)

      var color = d3.scaleOrdinal()
          .domain(age_group)
          .range(d3.schemeCategory10);

      var svg = d3.select(".fig2").append("svg")
          .attr("width", 600)
          .attr("height", 600)
      var g=svg.append("g")
          .attr("transform", "translate(" + 300 + "," + 300 + ")");

      var pie = d3.pie().value(function(d) { 
            return d.amount; 
        });
 
      var arc = g.selectAll("arc")
               .data(pie(age_group))
               .enter();

      var path = d3.arc()
               .outerRadius(300 - 10)
               .innerRadius(0);


      arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) { return color(d.data.age); });

      var label = d3.arc()
               .outerRadius(300)
               .innerRadius(0);
     
      arc.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ")"; 
                })
               .text(function(d) { return d.data.age; })
               .style("font-family", "arial")
               .style("font-size", 12);



      

    });
