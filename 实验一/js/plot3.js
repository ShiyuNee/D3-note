var svg3 = d3.select("body")
  .select("#svg1")

var width = 500 , height = 500
var padding = 3
var treemap = d3.layout.treemap()
  .size([width, height])
  .padding(padding)
  .value(function(d){ return d.count})

d3.json("../html/titanic_disaster.json", function(error, data) {
  var nodes = treemap.nodes(data);
  var links = treemap.links(nodes);

  console.log(nodes);
  console.log(links);

  var treeGroups = svg3.selectAll(".tree")
    .data(nodes.filter(function(d){ return !d.children; }))
    .enter()
    .append("g")
    .attr("class" , "tree")

  var names = ["first" , "second" , "third" , "crew"]
  var colors = ["#36bfff", "#ba7cff" , "#ff9600", "#00cd77"]

  var ordinal = d3.scale.ordinal()
    .domain(names)
    .range(colors)

  var rects = treeGroups.append("rect")
    .attr("class","nodeRect")
    .attr("x",function(d){ return d.x + 50})
    .attr("y",function(d){ return 500 + d.y; })
    .attr("width",function(d){ return d.dx; })
    .attr("height",function(d){ return d.dy; })
    .style("fill",function(d,i){
      return ordinal(d.parent.name); });

  var texts = treeGroups.append("text")
    .attr("class","nodeName")
    .attr("x",function(d){ return d.x + 85})
    .attr("y",function(d){ return d.y + 550; })
    .attr("text-anchor" , "middle")
    .attr("fill" , "#fcfcfc")
    .text(function(d){
      return d.name
    });

  treeGroups.append("text")
    .attr("class","nodeName")
    .attr("x",function(d){ return d.x + 82})
    .attr("y",function(d){ return d.y + 570; })
    .attr("text-anchor" , "middle")
    .attr("fill" , "#fcfcfc")
    .text(function(d){
      return d.count
    });

  svg3.append("text")
    .attr("class","nodeName")
    .attr("x",75)
    .attr("y",920)
    .attr("text-anchor" , "middle")
    .attr("fill" , "#fcfcfc")
    .text("23");

  svg3.append("text")
    .attr("class","nodeName")
    .attr("x",78)
    .attr("y",900)
    .attr("text-anchor" , "middle")
    .attr("fill" , "#fcfcfc")
    .text("female");


})
