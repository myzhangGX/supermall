//防抖函数
//参数  方法 + 时间
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
//处理时间格式  参数 date 时间戳*1000对象   fmt 时间格式
// 正则表达式是干什么的？ 字符串匹配利器
export function formatDate(date, fmt) {
  // 1.获取年份  2021  y 1  yy 21  yyy 021  yyyy 2021
  // y+ --> 1个或者多个y    y* --> 0个或者多个  y？ --> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    /*根据匹配出来的结果，传过来的y多少个进行截取*/
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取
  // M+ --> 正则表达式中的一个规则
  //
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(), // h和H
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

/* 5:5:5 --> 05:05:05  */
/*处理不够位数补0*/ /*根据传过来的字符串长度补00再截取*/
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
