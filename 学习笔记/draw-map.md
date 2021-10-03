**制作地图需要 JSON 文件，将 JSON 的格式应用于地理上的文件，叫做 GetJSON 文件**

### 定义投影函数

- 由于 GeoJSON 文件中的地图数据，都是经度和纬度的信息。它们都是三维的，而要在网页上显示的是二维的，所以要设定一个投影函数来转换经度纬度

  - 注意：center设定的地图的中心是**经度**和**纬度**

  ```js
      var projection = d3.geoMercator()//投影函数
          .center([107, 31])//设定地图的中心位置--经度和纬度
          .scale(850)//设定放大的比例
          .translate([width/2, height/2]);//设定平移
  ```

### 定义地理路径生成器

- 通过地图中的地理数据生成path元素的路径值

- projection()是设置生成器的投影函数，就像坐标设定比例尺一样 

  ```js
  var path = d3.geoPath()
      .projection(projection);
  ```

### 绘制地图

- eg1：

```js
    d3.json("world.json").then(root=>{
        console.log(root.features);
    
        svg.selectAll("path")
            .data( root.features )
            .enter()
            .append("path")
            .attr("stroke","#000")
            .attr("stroke-width",1)
            .attr("fill", (d,i)=>{
                return color(i);
            })
            .attr("d", path )   //使用地理路径生成器
            .on("mouseover",(d,i)=>{
                        d3.select(this)
                           .attr("fill","yellow");
                    })
                    .on("mouseout",(d,i)=>{
                        d3.select(this)
                           .attr("fill",color(i));
                    });
    });
```

- eg2：

```js
mapSvg.selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr("fill" , "#09b4ff")
      .on("mouseover", d => {
        const bounds = path.bounds(d); //path.bounds(d)以[[x0,y0],[x1,y1]]的形式返回包围盒的边界坐标
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
```



