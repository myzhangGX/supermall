<template>
  <div id="home" class="wrapper">
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
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
    <goods-list :goods="goods['pop'].list"/>
  </div>
</template>

<script>
//导入链接请求封装的方法
import {getHomeMultidata, getHomeGoods} from "network/home";
//轮播组价
import {Swiper, SwiperItem} from "components/common/swiper";
//轮播下面的组件
import RecommendView from "./childComps/RecommendView";//轮播下推荐的图片图组件
import FeatureView from "./childComps/FeatureView";//本周流行组件
//公共组件
import NavBar from "components/common/navvar/NavBar"; //显示购物街的组件
import TabControl from "components/content/tabControl/TabControl";//显示切换商品组件
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "Home",
  components: {
    FeatureView,
    RecommendView,
    Swiper,
    SwiperItem,
    TabControl,
    NavBar,
    GoodsList,

  }, data() {
    return {
      banners: [],
      recommends: [],
      //  流行 新款 精选 定义的数据源
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      }
    }
  },
  created() {
    //  1.请求多个数据
    this.getHomeMultidata()

    //请求商品数据
    //请求到三个类型的数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  }, methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res
        //获取到res返回的数据模块
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //意思是将res的数组放入goods里面
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.hone-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  /*让文字停留不被划走*/
  background: #fff ;
  position: sticky;
  top: 44px;
  z-index: 9;
}

</style>