<template>
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
    this.$store.commit("setGoodsList", []);
    this.$store.dispatch("getGoodsList", {
      type: this.leftMeun[0],
      page: 1,
      sort: "all",
    });
  },
  methods: {
    scroll(index, e) {
      if (this.move) {
        return;
      }
      this.$store.commit("setIndex", index);
      const { leftBar } = this.$refs;
      const sonHeight = e.target.offsetHeight;
      const sonTop = e.target.getBoundingClientRect().top;
      const pHeight = leftBar.offsetHeight;
      const pTop = leftBar.getBoundingClientRect().top;
      leftBar.scrollTop += sonTop + sonHeight / 2 - pTop - pHeight / 2;
      this.$store.commit("setGoodsList", []);
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
.left-bar-container::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>