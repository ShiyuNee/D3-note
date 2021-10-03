const mapWidth = 1000;
const mapHeight = 500;

// 定义地图的投影
const projection = d3.geoMercator()
.center([-67,25.3])
.translate([mapWidth - 60, mapHeight-50])
.scale([800]);

// 定义路径生成器
const path = d3.geoPath()
.projection(projection);

// 创建 SVG 元素
let mapSvg = d3.select('body')
.append('svg')
.attr('width', mapWidth)
.attr('height', mapHeight)
.attr("class", "clickable");

//通过画线记录得到整个地图所占的像素位置
var min_x = 134
var max_x = 940
var min_y = 20
var max_y = 452

// mapSvg.append("line")
//   .attr("x1" , min_x)
//   .attr("y1" , min_y)
//   .attr("x2" , max_x)
//   .attr("y2" , min_y)
//   .attr("stroke" , "black")

let jsonStorage;
// 读入 GeoJSON 数据
d3.csv("sunshine.csv").then(csvdata => {
  console.log(csvdata)
  var sunshine = Array()
  for (let i = 0; i < 72; i += 1) {
    sunshine.push(parseInt(csvdata[i].sunshine))
  }
  var month = Array()
  for(let i = 0 ; i < 12 ; i+= 1){
    month.push(csvdata[i].month)
  }

  //得到所有城市的名称和其物理位置
  var name_position = Array()
  for(let i = 0 ; i < csvdata.length ; i += 12){
    name_position.push([csvdata[i].city , [csvdata[i].lon , csvdata[i].lat]])
  }
  console.log(name_position)

  //初始化地图中的最大最小经纬度
  var maxl = -200
  var minl = 200
  var maxw = -100
  var minw = 100
  d3.json('../html/us-states.json').then(json => {
    jsonStorage = json;
    console.log(jsonStorage.features)

    mapSvg.selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr("fill" , (d)=>{

        return "#09b4ff"
      })
      .on("mouseover", jsonFeature => {
        const bounds = path.bounds(jsonFeature);
        const dx = (bounds[0][0] + bounds[1][0]) / 2;
        const dy = (bounds[0][1] + bounds[1][1]) / 2;
        mapSvg.append("text")
          .attr("class" , "map_text")
          .attr("dx", dx - 20)
          .attr("dy", dy)
          .attr("font-size", "14px")
          .text(jsonFeature.properties.name)
          .style("cursor", "default")
      })
      .on("mouseout", () => mapSvg.selectAll(".map_text").remove())

    //得到地图中对应的最大最小经纬度
    for(let i = 0 ; i < jsonStorage.features.length ; i++){
      for(let j = 0 ; j < jsonStorage.features[i].geometry.coordinates[0].length ; j++){
        maxl = d3.max([maxl , jsonStorage.features[i].geometry.coordinates[0][j][0]])
        minl = d3.min([minl , jsonStorage.features[i].geometry.coordinates[0][j][0]])
        maxw = d3.max([maxw , jsonStorage.features[i].geometry.coordinates[0][j][1]])
        minw = d3.min([minw , jsonStorage.features[i].geometry.coordinates[0][j][1]])
      }
    }
    console.log(maxl)
    console.log(minl)
    console.log(maxw)
    console.log(minw)

    //根据地图的最大最小经纬度和其所占像素位置，构建比例尺，为寻找sunshine.csv中的城市位置做准备
    var linear_x = d3.scaleLinear()
      .domain([minl , maxl])
      .range([min_x , max_x])

    var linear_y = d3.scaleLinear()
      .domain([minw , maxw])
      .range([max_y , min_y])

    mapSvg.selectAll("circle")
      .data(name_position)
      .enter()
      .append("circle")
      .attr("cx" , d=>{
        return linear_x(d[1][0])
      })
      .attr("cy" , d=>{
        return linear_y(d[1][1])
      })
      .attr("r" , 3)

    mapSvg.selectAll(".cir_tex")
      .data(name_position)
      .enter()
      .append("text")
      .attr("class" , "cir_tex")
      .attr("x" , d=>{
        return linear_x(d[1][0])
      })
      .attr("y" , d=>{
        return linear_y(d[1][1])
      })
      .text(d=>{return d[0]})


    var lineleft = 100
    var lineright = 980

    mapSvg.selectAll(".line")
      .data(name_position)
      .enter()
      .append("line")
      .attr("x1" , lineleft)
      .attr("y1" , d=>{
        return linear_y(d[1][1])
      })
      .attr("x2" , lineright)
      .attr("y2" , d=>{
        return linear_y(d[1][1])
      })
      .attr("stroke" , "rgba(17,18,26,0.34)")

    var linear_r = d3.scaleLinear()
      .domain([d3.min(sunshine) , d3.max(sunshine)])
      .range([0.5 , 5])

    mapSvg.selectAll(".line_circle")
      .data(csvdata)
      .enter()
      .append("circle")
      .attr("class" , "line_circle")
      .attr("cx" , (d)=>{
        return d.monthnum * 80 + 100
      })
      .attr("cy" , (d,i)=>{
        return linear_y(d.lat)
      })
      .attr("r" , d=>{
        return linear_r(parseInt(d.sunshine))
      })
      .attr("fill" , "rgba(253,7,210,0.87)")

    mapSvg.selectAll(".text_circle")
      .data(csvdata)
      .enter()
      .append("text")
      .attr("class" , "text_circle")
      .attr("x" , (d)=>{
        return d.monthnum * 80 + 100
      })
      .attr("y" , (d,i)=>{
        return linear_y(d.lat) + 15
      })
      .attr("text-anchor" , "middle")
      .attr("font-size" , 10)
      .text(d=>{
        return d.sunshine
      })



    var dis = Array()
    for(let i = 0 ; i < 12 ; i += 1){
      dis.push(i * 80)
    }
    console.log(dis)
    console.log(month)

    var ordinal = d3.scaleOrdinal()
      .domain(month)
      .range(dis)

    var axis = d3.axisBottom(ordinal)

    mapSvg.append("g")
      .attr("transform" , "translate(100 , 470)")
      .call(axis)

  })
})


