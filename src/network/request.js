import axios from "axios";

export function request(config) {
	//    1创建axios的实例
	const instance = axios.create({
		baseURL: "http://152.136.185.210:7878/api/m5",
		//时间5秒
		timeout: 5000
	})
	//2.axios的拦截器
	//全局axios.interceptors
	instance.interceptors.request.use(config => {
		return config
	}, err => {
		// console.log(err)
	})

	//2.2响应拦截
	instance.interceptors.response.use(res => {
		return res.data
	}, err => {
		console.log(err)
	})


	//3发送真正的网络请求
	return instance(config)

}