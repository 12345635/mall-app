<template>
  <div class="shopping-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      {{ shopList }}
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <GoodsCard
          v-for="item in shopList"
          :key="item.id"
          v-bind="item"
          :num="counterMap[item.id]"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import GoodsCard from "@/components/GoodsCard";
import { mapState } from "vuex";
export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      type: "all",
      page: 1,
      shopList: [],
    };
  },
  computed: {
    ...mapState(["goodsList", "counterMap"]),
  },
  created() {
    this.$api.getGoodsByIds({ value: 2 }).then((value) => {
      this.shopList = value;
    });
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.refreshing = false;
          return;
        }
        this.page += 1;
        this.$store
          .dispatch("getGoodsList", {
            page: this.page,
            sort: this.type,
          })
          .then((r) => {
            if (r) {
              this.loading = false;
            } else {
              this.finished = true;
            }
          });
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.$store.commit("setGoodsList", []);
      this.page = 1;
      this.finished = false;

      // 重新加载数据
      this.$store.dispatch("getGoodsList", {
        page: this.page,
        sort: this.type,
      });
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = false;
      this.onLoad();
    },
    changeType(type) {
      if (type == "all") {
        this.type = "all";
      } else if (type == "sale") {
        this.type = "sale";
      } else {
        if (this.type == "price-up") {
          this.type = "price-down";
        } else {
          this.type = "price-up";
        }
      }
      this.onRefresh();
    },
  },
};
</script>
<style lang="less" scoped>
.shopping-container {
  padding: 20px;
}
</style>