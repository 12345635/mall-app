<template>
  <div class="classify-container">
    <div class="search-container">
      <van-icon name="search" />
      <div>苹果大减价1元一斤</div>
    </div>
    <OneBar />
    <template v-if="!showSide">
      <LeftBar />
      <GoodsList />
    </template>
    <van-loading v-else />
  </div>
</template>
<script>
import OneBar from "../components/OneBar";
import LeftBar from "../components/LeftBar";
import GoodsList from "../components/GoodsList";
import { mapState } from "vuex";
export default {
  data() {
    return {
      meunList: [],
    };
  },
  components: {
    OneBar,
    LeftBar,
    GoodsList
  },
  computed: mapState(["showSide"]),
};
</script>

<style lang="less" scoped>
.search-container {
  width: 355px;
  height: 33px;
  border: 2px solid #eee;
  margin: 10px auto 0;
  background: #eee;
  border-radius: 10px;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #a1a1a1;
}
</style>