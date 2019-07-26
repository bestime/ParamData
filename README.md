# ParamData
原生js实现对象序列化为字符串, 用于URL查询字符串或AJAX请求

# 使用
```javascript
var query = {
  name: 'bestime',
  skills: ['javascript', 'nodejs', { other: '测试数据' }]
}

var data = ParamData(query); 
console.log(decodeURIComponent(data))； // => name=bestime&skills[]=javascript&skills[]=nodejs&skills[2][other]=测试数据
```
