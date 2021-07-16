<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车</div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "Category",
  components: {
    NavBar
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
}
</style>
