<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  /*组件私有*/
  import HomeSwiper from "./childComps/HomeSwiper"; //轮播图
  import RecommendView from "./childComps/RecommendView"; //推荐
  import FeatureView from "./childComps/FeatureView"; //本周流行

  /*公共组件*/
  import NavBar from "@/components/common/navbar/NavBar"; //导航栏，屏幕最下方4大组件
  import TabControl from "@/components/content/tabControl/TabControl"; // 切换商品
  import GoodsList from "@/components/content/goods/GoodsList"; //商品展示
  import Scroll from "@/components/common/scroll/Scroll"; //滚动
  import BackTop from "@/components/content/backTop/BackTop"; //返回顶部图片
  /*数据*/
  import {getHomeMuleidata, getHomeGoods} from "@/network/home";  //网络请求
  import {itemListenerMixin, backTopMixin} from "@/common/mixin"; //混入

  export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin, backTopMixin],
  data() {
     return {
       banners: [],
       recommends: [],
       goods: {
         'pop': {page: 0, list: []},
         'new': {page: 0, list: []},
         'sell': {page: 0, list: []},
       },
       currentType: 'pop',
       tabOffsetTop: 0,//保存变量切换类型高度
       isTabFixed: false,//决定是否显示切换类型
       saveY: 0, //保存变量--》页面位置
     }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() { //销毁
    console.log("home,destroyed");
  },
  activated() { //路由进来
    // console.log(this.saveY + "进来")
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() { //路由离开
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
    // console.log(this.saveY + "离开");
  },
  created() { //组件创建好就发送请求
    //1.请求多个数据
    this.getHomeMuleidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {},
  methods: {
    /**
     * s事件监听相关方法
     */
    //选项切换事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      //将显示切换类型固定 tabControl1/2 赋值给它们
      //不能保证用户点击哪个，所有设置两个保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //监听滚动位置
    contentScroll(position) {
      //打印出来全是负数，所以取相反数
      // 当y轴到底一定位置则变 true
      //1.判断BackTop是否显示
      this.listenShowBackTop(position)

      //2.决定tabControl是否吸顶(position: fixed)
      //保存变量，获取当前滚动位置是否大于this.tabOffsetTop
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //监听加载更多
    loadMore() {
      //调用之前方法 每次调用+1 so直接调用
      this.getHomeGoods(this.currentType)
    },
    //
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop //保存变量
    },
    /**
     * 网络请求相关方法
     */
    getHomeMuleidata() {
      getHomeMuleidata().then(res => {
        //this.result = res;
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      //动态获取页码
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //特殊语法，将一个数组解析塞进另一个数组里面
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<!--scoped 作用域 针对当前组件起效果-->
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh; /*vh -->viewport height*/
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;

    /*使用浏览器原生滚动时,为了不让导航时使用*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*第二种方法*/
  /*.content {*/
  /*  !*overflow: hidden;*! !*bug 隐藏后无法滚动*!*/

  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/
  /*第一种方法*/
  .content {
     height: calc(100% - 93px);
     overflow: hidden;
     /*margin-top: 44px;*/
  }

  /*没效果，可丢。。。*/
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
