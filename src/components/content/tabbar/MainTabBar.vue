<template>
  <div>
    <tab-bar>
      <!--      activeColor 传颜色给到组件-->
      <TabBarltem path="/home" activeColor="blue">
        <!--   通过动态的slot的插槽来实现自己的样式     -->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </TabBarltem>
      <TabBarltem path="/category" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </TabBarltem>
      <TabBarltem path="/cart" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </TabBarltem>
      <TabBarltem path="/profile" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </TabBarltem>
    </tab-bar>
  </div>
</template>


<script>

import TabBar from "@/components/common/tabbar/TabBar";
import TabBarltem from "@/components/common/tabbar/TabBarltem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarltem
  }
}
</script>

<style scoped>

</style>