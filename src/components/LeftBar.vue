<template>
<!-- 左侧导航 -->
  <div class="left-bar-container" ref="leftBar">
    <div
      class="bar-item"
      v-for="(item, i) in leftMeun"
      :key="item.imgURL"
      :class="{ active: index === i }"
      @touchend="scroll(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ (item = typeof item == "number" ? "全部" : item) }}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      move: false,
    };
  },
  computed: {
    ...mapState(["leftMeun", "index"]),
  },
  created() {
    // 清空商品缓存
    this.$store.commit("setGoodsList", []);
    // 获取商品列表
    this.$store.dispatch("getGoodsList", {
      type: this.leftMeun[0],
      page: 1,
      sort: "all",
    });
  },
  methods: {
    // 设置滚动条滚动距离
    scroll(index, e) {
      if (this.move) {
        return;
      }
      // 保存以下当前点击元素的index
      this.$store.commit("setIndex", index);
      // 找到refs中名叫leftBar的元素
      const { leftBar } = this.$refs;
      // 获取子元素的高度
      const sonHeight = e.target.offsetHeight;
      // 获取子元素距离上边的高度
      const sonTop = e.target.getBoundingClientRect().top;
      // 获取leftBar的高度
      const pHeight = leftBar.offsetHeight;
      // 获取leftBar距离上边的高度
      const pTop = leftBar.getBoundingClientRect().top;
      // 设置leftBar滚动条滚动的距离
      leftBar.scrollTop += sonTop + sonHeight / 2 - pTop - pHeight / 2;
      // 清空商品列表
      this.$store.commit("setGoodsList", []);
      // 重新获取商品列表
      this.$store.dispatch("getGoodsList", {
        type: this.leftMeun[index],
        page: 1,
        size: 10,
        sort: "all",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.left-bar-container {
  position: fixed;
  left: 0;
  top: 135px;
  bottom: 50px;
  width: 79px;
  overflow: auto;
  scroll-behavior: smooth;
  .bar-item {
    width: 79px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    color: #ff1a90;
    font-weight: bold;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 8px;
    background: #ff1a90;
    top: 50%;
    transform: translateX(-50%);
    left: 0;
    content: "";
  }
}
.left-bar-container::-webkit-scrollbar {//设置滚动条的样式
  width: 0;
  background: none;
}
</style>