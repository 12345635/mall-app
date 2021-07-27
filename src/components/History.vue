<template>
  <div class="history-container">
    <h4>历史搜索</h4>
    <div
      class="history-item"
      v-for="item in searchList"
      :key="item.time"
      @click="search(item.value)"
    >
      {{ item.value }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchList: {
      default() {
        return [];
      },
    },
  },
  methods: {
    search(value) {
      this.$emit("search", value);
    },
  },
};
</script>
<style lang="less" scoped>
.history-item {
  padding: 15px;
   background: #eee;
  font-size: 12px;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
</style>