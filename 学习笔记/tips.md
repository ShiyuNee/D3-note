### d3.min / d3.max

- d3.min( ) 和 d3.max( )中传入的参数都是数组，求的是数组中的最大值和最小值，而不是比较两个数，求出最大值或最小值

### d3.scaleOrdinal

- domain是要显示在坐标轴上的值

- range是坐标轴在图中所占的像素长度

- ==千万不要写反了==

  ```js
   var ordinal = d3.scaleOrdinal()
        .domain(month) //坐标轴上显示的刻度是月份
        .range(dis) //每个月份出现的位置
  
   var axis = d3.axisBottom(ordinal)
  
   mapSvg.append("g")
       .attr("transform" , "translate(100 , 470)")
       .call(axis)
  ```

  