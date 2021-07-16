//封装文件
import axios from "axios";

//3. 最后封装
export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1 请求拦截的作用
    instance.interceptors.request.use(config => {
      //3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
      return config
    }, err => {
      //console.log(err);
    })

    // 2.2 响应拦截  res 获取响应成功数据 err 失败
    instance.interceptors.response.use(res => {
       return res.data
    }, err => {
      //console.log(err);
    })

    // 3.发送真正的网络请求  源码显示返回的本身就是Promise 所以直接返回下面那个
    return instance(config)
}
