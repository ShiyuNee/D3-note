### 交互过程

```js
var circle = svg.append("circle");

circle.on("click", function(){
    //在这里添加交互内容
});
```

==在 D3 中，每一个选择集都有 on() 函数，用于添加事件监听器。==

==on() 的第一个参数是监听的事件，第二个参数是监听到事件后响应的内容，第二个参数是一个函数==

==当某个事件被监听到时，D3 会把当前的事件存到 d3.event 对象，里面保存了当前事件的各种参数==

### 鼠标事件

- click：鼠标单击某元素时，相当于 mousedown 和 mouseup 组合在一起。
- mouseover：光标放在某元素上。
- mouseout：光标从某元素上移出来时。
- mousemove：鼠标被移动的时候。
- mousedown：鼠标按钮被按下。
- mouseup：鼠标按钮被松开。
- dblclick：鼠标双击。

### 键盘事件

- keydown：当用户按下任意键时触发，按住不放会重复触发此事件。该事件不会区分字母的大小写，例如“A”和“a”被视为一致
- keypress：当用户按下字符键（大小写字母、数字、加号、等号、回车等）时触发，按住不放会重复触发此事件。该事件区分字母的大小写
- keyup：当用户释放键时触发，不区分字母的大小写

### 程序示例

- ==d3.select(this)，表示选择当前的元素，this 是当前的元素==

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
</head>
<body>

</body>
<script>
  var height = 400 ; var width = 400 ;
  var dataset = [10 , 20 , 30]
  var colors = ["blue" , "blue" , "blue"]
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width" , width)
    .attr("height" , height)

  var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform" , function(d,i){
      return "translate(50,50)"
    })

  g.append("circle")
    .attr("cx" , function(d,i){return 50 + i * 75} )
    .attr("cy" , 100)
    .attr("r" , function(d,i){return d})
    .attr("fill" , function(d,i){ return colors[i]})
    .on("mouseover" , function(d,i) {
      d3.select(this).attr("fill" , "yellow")
    })
    .on("mouseout" , function(d,i){
      d3.select(this).attr("fill" , "blue")
    })

  g.append("text")
    .attr("x" , function(d,i){return 50 + i * 75})
    .attr("y" , function(d,i){return 100 - d - 10})
    .attr("text-anchor" , "middle")
    .style("fill" , "dark")
    .text(function(d){return d})

  d3.select("body")
    .transition()
    .duration(2000)
    .style("background-color" , "lightblue")

</script>
</html>

```

