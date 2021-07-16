<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!--属性：topImages 传入值：top-images      -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"; //顶部导航栏
import DetailSwiper from "./childComps/DetailSwiper"; //轮播图
import DetailBaseInfo from "./childComps/DetailBaseInfo"; //商品基本信息
import DetailShopInfo from "./childComps/DetailShopInfo"; //店铺基本信息
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"; //推荐图片展示
import DetailParamInfo from "./childComps/DetailParamInfo"; //参数信息
import DetailCommentInfo from "./childComps/DetailCommentInfo"; //推荐信息
import DetailBottomBar from "./childComps/DetailBottomBar"; //底部工具栏

import Scroll from "@/components/common/scroll/Scroll"; //滚动
import GoodsList from "@/components/content/goods/GoodsList";  //推荐信息展示公共组件
// import Toast from "@/components/common/toast/Toast";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '@/network/detail' //网络请求数据
import {itemListenerMixin,backTopMixin} from "@/common/mixin";  // 混入
import {debounce} from "@/common/utils";  // 工具类

import {mapActions} from 'vuex'
import Toast from "@/components/common/toast/Toast"; //辅助函数

export default {
  name: "Detail",
  components: {
    Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null, //存放iid
      topImages: [],
      goods: {}, //存放杂乱无章的数据  对象默认不要给null，给{}空对象，否则报错
      shop: {}, //店铺信息
      detailImages: [], //商品详情数据
      detailInfo: {}, //商品的详情数据
      paramInfo: {}, //商品参数
      commentInfo: {}, //评论信息
      recommends: [], //商品推荐数据
      themeTopYs: [], //导航栏主题记录y轴位置
      getThemeTopY: null, //记录主题防抖
      currentIndex: 0, //记录滚动打印
      // message: '', //记录提示信息
      // show: false, //记录状态
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 2.1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result
      this.topImages = res.result.itemInfo.topImages

      // 2.2.获取商品信息  赋值进一个对象
      this.goods = new Goods(data.itemInfo, data.columns ,data.shopInfo.services)

      // 2.3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 2.4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 2.5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 2.6保存评论信息  保存之前判断是否含有评论
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      // 1.第一次获取，值不对
      //值不对的原因,this.$refs.comment.$el压根没有渲染
      // this.themeTopYs = []
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //
      // console.log(this.themeTopYs);
      // //等到所有函数加载完，才回调一次
      // this.$nextTick(() => {
        //2.第二次获取  值不对
        // 值不对原因 ; 图片没有计算在内
        //仅仅最新的数据,对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
        // offsetTop值不对的时候,都是因为图片的问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //
      //   console.log(this.themeTopYs);
      // })
    })

    //3.请求商品推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    //4.给getThemeTopY赋值（对应this.theme.themeTopY赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
      //输出各标题的位置 offsetTop
      // console.log(this.themeTopYs);
    }, 100)
  },
  methods: {
    ...mapActions(['addCart']),
    // ...mapActions({
    //   add: "addCart"
    // }),
    //图片加载
    imageLoad() {
       // this.$refs.scroll.refresh() /*刷新很多次*/
      /*mixin 混入Detail对象里面，所以可以直接用*/
      this.newRefresh()
      //调用getThemeTopY
      this.getThemeTopY()
    },
    //获取到导航栏index
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    //监听滚动位置
    contentScroll(position) {
      // console.log(position);
      //获取y值
      const positionY = -position.y

      //2.positionY和主题中值进行对比
      // [0, 100, 200, 300, 非常大的值]
      // console.log(Number.MAX_VALUE);  js最大值
      // positionY 在 0 和 100 之间，index = 0
      // positionY 在 100 和 200 之间，index = 1
      // positionY 在 200 和 300 之间，index = 2
      // positionY 大于等于 300，index = 3  ||  positionY 在 300 和 非常大的值 之间
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
        //   console.log(i); // str
        // }
        // if(this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
        //   || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        //优化
        if (this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //3.是否显示回到顶部
      this.listenShowBackTop(position)
    },
    //添加进购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.nowPrice = this.goods.nowPrice
      product.iid = this.iid

      // 2.将商品添加到购物车(1.Promise 2.mapActions)
      // this.$store.cartList.push(product)  // state
      //this.$store.commit('addCart', product) //mutations
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      //使用了mapActions 辅助函数
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.message = ''
        // },1500)
        this.$toast.show(res)
      })

      //3. 添加到购物车成功
    }
  },
  mounted() {
    // console.log("mounted");
  },
  updated() { //只要有数据变化就会执行updated
  },
  destroyed() {
    this.$bus.$off('itemImaLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 /*设置导航栏层级，背景颜色，不会被覆盖*/
 .detail-nav {
   position: relative;
   z-index: 9;
   background-color: #fff;
 }

 .content {
   height: calc(100% - 44px - 58px);
 }
</style>
