var svg1 = d3.select("body").select("#svg1")
var colors = ["#36bfff", "#ba7cff" , "#ff9600", "#00cd77"]
var classs = ["first" , "second" , "third" , "crew"]
var data = Array(0)

d3.csv("../html/titanic_disaster.csv" , function(error , csvdata){
  if (error){
    console.log(error)
  }
  // 不同班级的数据 ， 第一个是女生个数 ， 第二个是男生个数
  for(let i = 0 ; i <= 6 ; i = i + 2){
    data.push([csvdata[i].Count , csvdata[i+1].Count])
  }

  var pie = d3.layout.pie()
  var getpiedata = Array(0)

  for(let i = 0 ; i < 4 ; i++){
    getpiedata.push(pie(data[i]))
  }

  console.log(getpiedata)
  for(var j = 0 ; j < 4 ; j++){
    var outerRadius = 80 + j * 30
    var innerRadius = 50 + j * 30

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
    if(j === 0){
      var arcs = svg1.selectAll(".fir")
        .data(getpiedata[j])
        .attr("transform" , "translate(250,250)")
    }
    if(j === 1){
      var arcs = svg1.selectAll(".sec")
        .data(getpiedata[j])
        .attr("transform" , "translate(250,250)")
    }
    if(j === 2) {
      var arcs = svg1.selectAll(".thi")
        .data(getpiedata[j])
        .attr("transform", "translate(250,250)")
    }
    if(j === 3){
      var arcs = svg1.selectAll(".for")
        .data(getpiedata[j])
        .attr("transform" , "translate(250,250)")
    }

    arcs.append("path")
      .style("fill" , function(d,i){
        return colors[i]
      })
      .attr("d" , function(d){
        return arc(d)
      })

    arcs.append("text")
      .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")"
      })
      .attr("text-anchor","middle")
      .text(function(d , i){
        return d.data
      })
      .on("mouseover" , function(d,i){
        var chose = d3.select(this)
        for(var k = 0 ; k < 4 ; k++){
          if(d.data === data[k][0] || d.data === data[k][1]){
            chose.text(classs[k])
          }
        }
      })
      .on("mouseout" , function(d,i){
        d3.select(this).text(d.data)
      })

  }
})


svg1.append("rect")
  .attr("x" , 450)
  .attr("y" , 50)
  .attr("width" , 30)
  .attr("height" , 10)
  .attr("fill" , colors[0])

svg1.append("text")
  .attr("x" , 465)
  .attr("y" , 45)
  .attr("text-anchor" , "middle")
  .text("female")

svg1.append("rect")
  .attr("x" , 450)
  .attr("y" , 80)
  .attr("width" , 30)
  .attr("height" , 10)
  .attr("fill" , colors[1])

svg1.append("text")
  .attr("x" , 465)
  .attr("y" , 75)
  .attr("text-anchor" , "middle")
  .text("male")



