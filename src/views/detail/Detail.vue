<template>
  <!--  商品详情页-->
  <div id="detail">
    <!--    //导航栏-->
    <derail-nav-bar/>
    <!--    传送轮播图片数据数据-->
    <detail-swiper :top-images="topImages"/>
    <!--    商品信息-->
    <detail-base-info :goods="goods"/>
    <!--    商家基本信息-->
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>


import DerailNavBar from "./childComps/DerailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";

import {getDetail, Goods, Shop} from "network/detail";//导入获取到要展示的数据
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";

export default {
  name: "Detail",
  components: {
    DetailShopInfo,
    DetailBaseInfo,
    DetailSwiper,
    DerailNavBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      //  商品信息\
      goods: {},
      //  商家信息
      shop: {}
    }
  },
  created() {
    //1.保存传入的数据
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1获取轮播数据
      const data = res.result;
      // 2.获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages
      //3创建商品的对象
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //    取出商家的基本信息
      this.shop = new Shop(data.shopInfo)
    })

  }

}
</script>

<style scoped>

</style>
