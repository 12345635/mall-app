<template>
  <div id="app">
    <transition
      :name="transitionName"
      :mode="this.$router.back ? 'out-in' : 'in-out'"
    >
      <RouterView class="view" />
    </transition>
  </div>
</template>
<script>
export default {
  created() {
    const counterMap = JSON.parse(localStorage.getItem("goods")) || {};
    this.$store.commit("setCounterMap", counterMap);
  },
  data() {
    return {
      transitionName: "left",
    };
  },
  watch: {
    $route(to, form) {
      if (to.name == "Classify" && form.name == "Search") {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = "right";
      } else {
        this.transitionName = "left";
      }
      this.$router.back = false;
    },
  },
};
</script>
<style lang="less" scoped>
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: 0.3s linear;
}
.left-enter {
  transform: translate(100%, 0);
}
.right-leave-to {
  transform: translate(100%, 0);
}
</style>
