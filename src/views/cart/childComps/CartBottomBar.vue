<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
       去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex' //Vuex 辅助函数
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      //过滤选中 || 遍历   toFixed 保留两位小数
      return '¥' + this.cartList.filter(item => {
         return item.checked
      }).reduce((preValue, item) => {
         return preValue + item.nowPrice * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      //过滤筛选 选中的个数
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      //判断没有数据的情况下
      if (this.cartList.length === 0) return false
      //1.从数组里面查找有没有被选中的，如果有数组则没长度  使用filter
      // return !(this.cartList.filter(item => !item.checked).length)

      //2.使用find  //查找不选中
      // return !this.cartList.find(item => !item.checked)

      //3.普通遍历
      for(let item of this.cartList) {
        if (!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { //全部选中
         this.cartList.forEach(item => item.checked = false)
      }else {
        // 部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品')
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;

  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 7px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
