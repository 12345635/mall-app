<template>
  <van-tabbar route fixed>
    <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="qr" to="/classify">分类</van-tabbar-item>
    <van-tabbar-item
      icon="shopping-cart-o"
      to="/shopping"
      :badge="badge"
      id="shop-card"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["counterMap"]),
    badge() {
      const count = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0
      );
      if (count > 99) {
        return "99+";
      } else if (count <= 0) {
        return "";
      }
      return count;
    },
  },
};
</script>