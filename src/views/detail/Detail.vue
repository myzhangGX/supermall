<template>
  <!--  商品详情页-->
  <div id="detail">
    <!--    //导航栏-->
    <derail-nav-bar/>
    <!--    传送轮播图片数据数据-->
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>


import DerailNavBar from "./childComps/DerailNavBar";

import {getDetail} from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";

export default {
  name: "Detail",
  components: {
    DetailSwiper,
    DerailNavBar
  },
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    //1.保存传入的数据
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })

  }

}
</script>

<style scoped>

</style>
