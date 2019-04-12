const config = {
  api_base_url: 'http://bl.7yue.pro/v1/',
  appkey: 'AbhC31IG7ruCDp57' // GgRhTjUNUYn1fHke 可用
}

//例子 (在util   http.js中使用)
let fun1 = function() {

}
export let fun2 = function () {

}

// 可以在每个变量前面加入export导出
// 也可以单独定义个export 导出多个变量
// 着这里也可以改变变量名字用 as 
// 如果这里用了 as 改变名字了，那么在其他引用本模块 就要用 as后面的新名字
export {
  config,
  fun1 as fun11
}