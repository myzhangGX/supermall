<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScorll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: { //监听级别
      type: Number,
      default: 0
    },
    pullUpLoad: { //是否开启监听上拉事件
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,//存储变量
    }
  },
  mounted() { //声明周期函数，一旦挂载之后就创建BS
    //querySelector不能明确指定拿哪个class
    //document.querySelector('.wrapper') 当拥有多个wrapper时，可能获取不准确
    // console.log(this.$refs.wrapper);
    //1.创建BScroll对象
    this.scroll = new BScorll(this.$refs.wrapper, {
        click: true, //控制div元素点击,滚动条包裹的div监听
        observeDOM: true, //修复bug 动态计算 BetterScroll 的可滚动高度或者宽度
        probeType: this.probeType, //监听级别
        pullUpLoad: this.pullUpLoad //监听上拉更多
    })
    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })
    }
    //3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
    /*打印查看scroll属性*/
    // console.log(this.scroll);
    //bug 修复 scroll加载完，查询执行 refresh,根据最新的子组件重新计算滚动区域
    //this.scroll.refresh()
  },
  methods: {
    /*回到顶部滚动 坐标+时间*/
    scrollTo(x, y, time= 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    /*调用该方法方可执行多次加载更多，否则只能once*/
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    /*调用该方法每次图片加载完成刷新高度*/
    refresh() {
      this.scroll && this.scroll.refresh()  //加载异常？？
      // console.log('------+biu');
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
