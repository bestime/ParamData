# 使用
```javascript
var query = {
  name: 'bestime',
  skills: ['javascript', 'nodejs', { other: '测试数据' }]
}

var data = ParamData(query); 
console.log(data); // => name=bestime&skills%5B%5D=javascript&skills%5B%5D=nodejs&skills%5B2%5D%5Bother%5D=%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE
console.log(decodeURIComponent(data)); // => name=bestime&skills[]=javascript&skills[]=nodejs&skills[2][other]=测试数据
```
