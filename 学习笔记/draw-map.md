**制作地图需要 JSON 文件，将 JSON 的格式应用于地理上的文件，叫做 GeoJSON 文件**

### 定义投影函数

- 由于 GeoJSON 文件中的地图数据，都是经度和纬度的信息。它们都是三维的，而要在网页上显示的是二维的，所以要设定一个投影函数来转换经度纬度

- ==用 projection 函数可以直接生成经纬度的像素坐标==

  - 如果指定了 *center* 则将投影的中心设置为指定的以度为单位的 longitude 和 latitude 组成的二元数组 *center* 并返回投影. 如果没有指定 *center* 则返回当前的投影中心, 默认为 ⟨0°,0°⟩.

  - 如果指定了 *translate* 则将投影的平移偏移量设置为指定的二元数组 [*tx*, *ty*] 并返回投影. 如果没有指定 *translate* 则返回当前的平移偏移, 默认为 [480, 250]. **平移偏移量决定了投影中心的像素坐标**. 默认的平移偏移量将 ⟨0°,0°⟩ 放置在 960×500 的区域中心

    ```js
      var projection = d3.geoMercator()//投影函数
            .center([107, 31])//设定地图的中心位置--经度和纬度
            .scale(850)//设定放大的比例
            .translate([width/2, height/2]);//设定平移
    ```

  - projection.fitExtent()：调整投影的scale和translate使给定的 GeoJSON *object* 适应在 *extent* 范围中. *extent* 以 [[x₀, y₀], [x₁, y₁]] 的形式指定, 其中 x₀ 为包裹框的左边界, y₀ 为上边界, x₁ 为右边界, y₁ 为下边界. 返回投影.

    ```js
    projection.fitExtent([[x0 , y0] , [x1 , y1]] , Geojson)
    ```

    - eg:

      ```js
      const projection = d3.geoMercator()
      	.fitExtent([[20 , 20] , [980 , 480]] , json)
      //console.log(projection([-87.623177,41.881832]))
      //[622.0181141540079, 179.60586181380927]
       
      const path = d3.geoPath()
       	.projection(projection)
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


