//导入请求链接来拼接链接
import {request} from "@/network/request";

/*封装首页请求链接*/
export  function  getHomeMultidata(){
	return request({
		url:'/home/multidata'
	})
}