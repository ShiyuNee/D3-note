### 读取csv文件

```js
d3.csv("titanic_disaster.csv",function(error,csvdata){
    if(error){
        console.log(error);
    }
    console.log(csvdata);
});
```

