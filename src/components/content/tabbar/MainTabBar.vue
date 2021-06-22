<template>
  <div>
    <tab-bar>
      <!--      activeColor 传颜色给到组件-->
      <TabBarltem activeColor="blue" path="/home">
        <!--   通过动态的slot的插槽来实现自己的样式     -->
        <img slot="item-icon" alt="" src="~assets/img/tabbar/home.svg">
        <img slot="item-icon-active" alt="" src="~assets/img/tabbar/home_active.svg">
        <div slot="item-text">首页</div>
      </TabBarltem>
      <TabBarltem activeColor="blue" path="/category">
        <img slot="item-icon" alt="" src="~assets/img/tabbar/category.svg">
        <img slot="item-icon-active" alt="" src="~assets/img/tabbar/category_active.svg">
        <div slot="item-text">分类</div>
      </TabBarltem>
      <TabBarltem activeColor="blue" path="/cart">
        <img slot="item-icon" alt="" src="~assets/img/tabbar/shopcart.svg">
        <img slot="item-icon-active" alt="" src="~assets/img/tabbar/shopcart_active.svg">
        <div slot="item-text">购物车</div>
      </TabBarltem>
      <TabBarltem activeColor="blue" path="/profile">
        <img slot="item-icon" alt="" src="~assets/img/tabbar/profile.svg">
        <img slot="item-icon-active" alt="" src="~assets/img/tabbar/profile_active.svg">
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