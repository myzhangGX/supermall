//导入请求链接来拼接链接
import {request} from "@/network/request";

/*封装首页请求链接的函数方法*/
export function getHomeMultidata() {
	return request({
		url: '/home/multidata'
	})
}

/*请求的是流行新款精选的数据*/
export function getHomeGoods(type ,page) {
	return request({
		url: '/home/data',
		//params是拼接请求的数据和页码
		params: {
			type,
			page
		}
	})
}



// 函数调用 --> 压入函数栈中(保存函数调用过程中所有变量)
// 函数调用结束 --> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const name = ['biutefou', 'bbb']
// }
// test()

//将数据存进空数组中
const totalNums = []
const nums1 = [20, 11 ,22]
const nums2 = [20, 11 ,33]

// for (let n of nums1) {
//   totalNums.push(n)
// }

//特殊语法，
// totalNums.push(...nums1)