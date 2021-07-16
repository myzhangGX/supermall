import Toast from "./Toast";  //导入对象

const obj = {}

//一旦调用Vue.use  本质就是调用对象的 install 函数
// 默认传过来一个参数  就是Vue实例
obj.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2. new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

   //Vue 原型
   Vue.prototype.$toast = toast
}

export default obj
