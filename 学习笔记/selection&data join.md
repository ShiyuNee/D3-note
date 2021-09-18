### 选择集

- **d3.select()**：选择所有指定元素的**第一个**
- **d3.selectAll()**：选择指定**全部元素**

- ==选择后链接其他操作==

### 绑定数据

- datum（）：绑定**一个数据**到选择集上
- data（）：绑定**一个数组**到选择集上，**数组的各项值分别与选择集的各元素绑定**
- 绑定后使用匿名函数输出数据
  - d 是 数据
  - i 是 索引
  - this 是 当前DOM元素的引用

```js
var body = d3.select("body");
var p = body.selectAll("p");
var char = "654545";
p.datum(char).text(function(d,i){return "第" + i + "个的数据是" + d;});
// d是数值 ， i是索引
```

### enter的作用(数据个数比元素个数多时使用)

- 提供对剩余数据的访问

- enter()是用来在绑定数据之后，选择缺少的那部分DOM元素

- enter()只是进行选择，并未实际添加所需DOM元素。因此在enter()之后一般都会配合append()来进行DOM元素的实际创建。

  ```js
  <ul id = "list">
     <li></li>
     <li></li>
  </ul> 
  
  d3.select("#list").selectAll("li")
     .data([10, 20, 30, 25, 15])
     .text(function(d) { return "This is pre-existing element and the value is " + d; })
     .enter()
     .append("li")
     .text(function(d) 
        { return "This is dynamically created element and the value is " + d; });
  ```

### exit的作用（数据个数比元素个数少时使用）

- 删除未能绑定上数据的元素

  ```js
  <p>我是p1</p>
  <p>我是p2</p>
  <p>我是p3</p>
  <p>我是p4</p>
  <p>我是p5</p>
  
  <script>
    d3.selectAll("p").data([10,20]).text(function (d){return d;}).exit().remove();
  </script>
  
  //输出为 10 20;
  ```

### 元素引用

- 通过 id
  - select(#id)
  
- 通过class
  - select(.class)
  
  ```js
  d3.select("p.demo").text("woshinidie");//可以指定某个标签中的具体类别
  ```
  
- 通过id 和 class 选择多个元素时也要使用 selectAll

- attr设置的是属性，style设置的是样式

```js
<body> 
    <p id="mydemo">Sun</p>
    <p id="mydemo">Moon</p>
    <p>You</p>

<script>
    d3.select("body").selectAll("#mydemo").style({"font-size":"40px" , "color":"red"}); 
//style中单个name-value可以使用逗号。多个时使用Json格式
</script> 
</body> 
```

### 元素插入

- append（）在选择集末尾插入元素。==append("p") 是选择添加一个 p 元素==，==text() 是向添加的p元素中放的内容
  - 只能插入选择集的末尾
  
    ```js
    d3.select("body").append("p").text("Star");  还有选中文本内容的功能==
    ```
  
  - ==在选中多个对象时，会对每个对象都执行append==
  
    ```js
    d3.selectAll("p").append("p").text("我是新加的") //每个p后面都会出现一个新的p
    ```

- insert（）在选择集前面插入元素 , 需要指定插入位置
  - ==可以指定将元素插入在什么位置==

```js
d3.select("body").insert("p","#Moon").text("ssdads");
```

### 删除元素

- remove（）选择元素后，直接删除

```js
d3.select("body").select("#Moon").remove();
```

### 修改元素

- text（）

  - ==修改元素内容==

  - ==text()  还有选中文本内容的功能==

    ```js
    var a = d3.select("p").text(); // a的值是选中元素块中的文本内容
    ```

- html（）：与 text（）用法相同，只不过在修改元素内容时，可以添加 html 标签

  ```js
   d3.select(".myclass").html("Hello World! <span>from D3.js</span>");
  ```

  