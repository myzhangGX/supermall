<template>
  <div id="home">
    <router-view></router-view>
    <NavBar class="hone-nav">
      <div slot="center">
        购物街
      </div>
    </NavBar>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navvar/NavBar";
//导入链接请求
import {getHomeMultidata} from "@/network/home";

import {Swiper, SwiperItem} from "@/components/common/swiper";
import RecommendView from "./childComps/RecommendView";


export default {
  name: "Home",
  components: {
    RecommendView,
    Swiper,
    SwiperItem,
    NavBar
  }, data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    //  1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res)
      // this.result = res
      //获取到res返回的数据模块
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
.hone-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}

</style>