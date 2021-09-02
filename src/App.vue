<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created(){
    // 在创建之前获取以下本地存储的商品信息
    const counterMap = JSON.parse(localStorage.getItem("goods")) || {}
    this.$store.commit("setCounterMap",counterMap);
  }
}
</script>
<style lang="less">
*{
  padding: 0;
  margin:0;
} 
</style>
