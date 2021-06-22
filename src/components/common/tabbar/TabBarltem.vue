<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!--动态的class样式:class="{active: isActive}"-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "TabBarltem",
  props: {
    path: String,
    /*获取到是由组件的颜色*/
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      //isActive: true,
    }
  },
  computed: {
    isActive() {
      /*根据跳转链接来判断那一个为true
      * /home-> item1(/home)=true
      * 其他的链接就为false就不改变颜色
      *       * */
      return this.$route.path.indexOf(this.path) !== -1
    },
    /*动态绑定class的样式*/
    activeStyle() {
      return this.isActive ? {
        color: this.activeColor
      } : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

.active {
  color: red;
}
</style>