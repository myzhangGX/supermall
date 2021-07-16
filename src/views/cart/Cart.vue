<template>
  <div class="cart">
    <!-- 导航   -->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </NavBar>
    <!-- 商品列表   -->
    <cart-list/>
    <!--  底部汇总  -->
    <cart-bottom-bar/>
  </div>
</template>
<!-- components 放公共组件，views 独立组件
-->

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";


import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //两种语法
    //  ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: 'cartLength',
    })
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.cart {
  height: 100vh;
}
</style>
