var svg4 = d3.select("body").select("#svg1")

d3.csv("../html/titanic_disaster.csv" , function(error , csvdata){
  var female = Array()
  var male = Array()
  var female4 = Array()
  var male4 = Array()
  var tot_data4 = Array()
  var x_ordinal = Array()
  var dic = 60
  var left = 800
  var top = 900
  for(let i = 0 ; i < 8 ; i += 1){
    tot_data4.push(Number(csvdata[i].Count))
  }
  console.log(tot_data4)
  console.log(d3.min(tot_data4))

  var linear = d3.scale.linear()
    .domain([d3.min(tot_data4) , d3.max(tot_data4)])
    .range([10 , 300])

  var linear2 = d3.scale.linear()
    .domain([0 , d3.max(tot_data4)])
    .range([top  , top - 300])

  for(let i = 0 ; i < 8 ; i += 2){
    female4.push([left + i * dic , top - linear(csvdata[i].Count)])
    x_ordinal.push(left + i * dic)
    female.push(csvdata[i].Count)
  }

  console.log(x_ordinal)

  for (let i = 1 ; i < 8 ; i += 2){
    male4.push([left + (i - 1) * dic , top - linear(csvdata[i].Count)])
    male.push(csvdata[i].Count)
  }

  var linePath = d3.svg.line()
  svg4.append('path')
    .attr('d',linePath(female4))
    .attr('stroke','#ff38ff')
    .attr('stroke-width','3px')
    .attr('fill','none')

  svg4.append("path")
    .attr('d',linePath(male4))
    .attr('stroke','#389cff')
    .attr('stroke-width','3px')
    .attr('fill','none')


  var classs = ["first" , "second" , "third" , "crew"]
  var ordinal = d3.scale.ordinal()
    .range(x_ordinal)
    .domain(classs)

  var y_axis = d3.svg.axis().scale(linear2).orient("left")
  var x_axis = d3.svg.axis().scale(ordinal).orient("bottom")

  d3.select("svg")
    .append("g")
    .attr("transform" , "translate("+ left + ",0)")
    .attr("class" , "axis")
    .call(y_axis)

  d3.select("svg")
    .append("g")
    .attr("transform" , "translate(0," + top + ")")
    .attr("class" , "axis")
    .call(x_axis)

  svg4.selectAll("female_circle")
    .data(female4)
    .enter()
    .append("circle")
    .attr("class" , "female_circle")
    .attr("cx" , function(d , i){
      return d[0]
    })
    .attr("cy" , function(d,i){
      return d[1]
    })
    .attr("r" , 3)

  svg4.selectAll("female_text")
    .data(female)
    .enter()
    .append("text")
    .attr("class" , "female_text")
    .attr("x" , function(d , i){
      return female4[i][0]
    })
    .attr("y" , function(d,i){
      return female4[i][1]
    })
    .text(function (d,i){
      return d
    })

  svg4.selectAll("female_circle")
    .data(male4)
    .enter()
    .append("circle")
    .attr("class" , "female_circle")
    .attr("cx" , function(d , i){
      return d[0]
    })
    .attr("cy" , function(d,i){
      return d[1]
    })
    .attr("r" , 3)

  svg4.selectAll("male_text")
    .data(male)
    .enter()
    .append("text")
    .attr("class" , "male_text")
    .attr("x" , function(d , i){
      return male4[i][0]
    })
    .attr("y" , function(d,i){
      return male4[i][1] - 10
    })
    .text(function (d,i){
      return d
    })


})




