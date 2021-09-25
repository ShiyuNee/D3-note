var zhu = d3.select("body")
  .select("#svg1")
  .select(".zhu")

d3.csv("../html/titanic_disaster.csv" , function(error , csvdata) {
  if (error) {
    console.log(error)
  }
  var data_female2 = Array(0)
  var data_male2 = Array(0)
  var tot_data = Array()
  var leftup = 410
  var left = 800
  var width = 30
  var classs = ["" , "first" , "second" , "third" , "crew" , ""]
  var x_ordinal = Array()
  x_ordinal.push(-30)
  for(let i = 0 ; i < 4 ; i += 1){
    x_ordinal.push(i * 100)
  }
  x_ordinal.push(x_ordinal[4] + 30)
  console.log(x_ordinal)
  for(let i = 0 ; i < 8 ; i += 2){
    data_female2.push(csvdata[i].Count)
    tot_data.push(csvdata[i].Count)
  }

  for(let i = 1 ; i < 8 ; i += 2){
    data_male2.push(csvdata[i].Count)
    tot_data.push(csvdata[i].Count)
  }

  var linear = d3.scale.linear()
    .domain([d3.min(tot_data) , d3.max(tot_data)])
    .range([40 , 300])

  var linear2 = d3.scale.linear()
    .domain([0 , d3.max(tot_data)])
    .range([leftup  , leftup - 300])

  var ordinal = d3.scale.ordinal()
    .range(x_ordinal)
    .domain(classs)

  var y_axis = d3.svg.axis().scale(linear2).orient("left")
  var x_axis = d3.svg.axis().scale(ordinal).orient("bottom")

  zhu.selectAll(".rect_female")
    .data(data_female2)
    .enter()
    .append("rect")
    .attr("class" , "rect_female")
    .attr("x" , function(d , i){
      return left + i * 100
    })
    .attr("y" , function(d,i){
      return leftup - linear(d)
    })
    .attr("width" , width)
    .attr("height" , function(d,i){
      return linear(d)
    })
    .attr("fill" , "#ff36bf")

  zhu.selectAll("female_text")
    .data(data_female2)
    .enter()
    .append("text")
    .attr("class" , "female_text")
    .attr("x" , function(d,i){
      return left + 15 + i * 100
    })
    .attr("y" , function(d,i){
      return leftup - linear(d)
    })
    .attr("text-anchor","middle")
    .text(function(d){
      return d
    })
    .on("mouseover" , function(d,i){
      d3.select(this).text("female")
    })
    .on("mouseout" , function (d,i){
      d3.select(this).text(d)
    })

  zhu.selectAll(".rect_male")
    .data(data_male2)
    .enter()
    .append("rect")
    .attr("class" , "rect_male")
    .attr("x" , function(d , i){
      return left + i * 100 + width
    })
    .attr("y" , function(d,i){
      return leftup - linear(d)
    })
    .attr("width" , width)
    .attr("height" , function(d,i){
      return linear(d)
    })
    .attr("fill" , "#3657ff")

  zhu.selectAll("male_text")
    .data(data_male2)
    .enter()
    .append("text")
    .attr("class" , "male_text")
    .attr("x" , function(d,i){
      return left + 15 + i * 100 + width
    })
    .attr("y" , function(d,i){
      return leftup - linear(d)
    })
    .attr("text-anchor","middle")
    .text(function(d){
      return d
    })
    .on("mouseover" , function(d,i){
      d3.select(this).text("male")
    })
    .on("mouseout" , function (d,i){
      d3.select(this).text(d)
    })

  d3.select("svg")
    .append("g")
    .attr("transform" , "translate("+ left + ",0)")
    .attr("class" , "axis")
    .call(y_axis)

  d3.select("svg")
    .append("g")
    .attr("class" , "axis")
    .attr("transform" , "translate(" + (left+30) + "," + leftup + ")")
    .call(x_axis)
})
