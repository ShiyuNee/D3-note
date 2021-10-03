### 读取csv文件

- v3

```js
d3.csv("titanic_disaster.csv",function(error,csvdata){
    if(error){
        console.log(error);
    }
    console.log(csvdata);
});
```

- v5

```js
 d3.csv("sunshine.csv").then(csvdata => {
     console.log(csvdata)
 	})
```

- Json文件的读取类似
