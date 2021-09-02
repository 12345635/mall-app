<template>
<!-- 一级导航 -->
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
    // 获取仓库中记录的商品信息
    ...mapState(["counterMap"]),
    badge() {
      // 获取仓库中存储购物车商品信息的所有value值，并且相加
      const count = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0
      );
      // 如果数字大于了99 直接显示99+
      if (count > 99) {
        return "99+";
        // 小于或者等于0 直接返回空
      } else if (count <= 0) {
        return "";
      }
      // 直接返回计算的数值
      return count;
    },
  },
};
</script>