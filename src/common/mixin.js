import {debounce} from "./utils";
import BackTop from "@/components/content/backTop/BackTop"; //返回顶部
import {BACKTOP_DISTANCE} from "@/common/const"; //返回顶部

//监听防抖
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null, //记录监听事件
      newRefresh: null,
    }
  },
  mounted() {
    //防抖函数
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log("混入")
  },
}

//返回顶部
export const backTopMixin = {
   components: {
     BackTop
   },
   data() {
      return {
        isShowBackTop: false, //保存变量决定是否显示回到顶部
      }
   },
   methods: {
     //回到顶部
     backClick() {
       this.$refs.scroll.scrollTo(0, 0)
     },
     //抽取回到顶部函数
     listenShowBackTop(position) {
       this.isShowBackTop = -position.y > BACKTOP_DISTANCE
     }
   }
}
