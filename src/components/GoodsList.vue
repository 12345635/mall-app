<template>
  <div class="goods-list-container">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: type == 'all' }" @touchend="changeType('all')">
        综合
      </div>
      <div :class="{ active: type == 'sale' }" @touchend="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{ active: type == 'price-down' || type == 'price-up' }"
        @touchend="changeType('price')"
      >
        价格
        <van-icon
          :name="
            type == 'price-down'
              ? 'arrow-down'
              : '' || type == 'price-up'
              ? 'arrow-up'
              : ''
          "
        />
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <GoodsCard
            v-for="item in goodsList"
            :key="item.id"
            v-bind="item"
            :num="counterMap[item.id]"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import GoodsCard from "@/components/GoodsCard";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      type: "all",
      page: 1,
    };
  },
  components: {
    GoodsCard,
  },
  computed: mapState(["goodsList", "counterMap"]),
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
.list-header {
  display: flex;
  justify-content: flex-end;
  width: 296px;
  position: relative;
  top: 0;
  left: 79px;
  padding: 0 8px;
  box-sizing: border-box;
  div {
    width: 50px;
    height: 25px;
    text-align: center;
    color: #cecece;
    line-height: 25px;
  }
  .active,
  .price-up,
  .price-down {
    color: #ff1a90;
    font-weight: bold;
  }
}
.list-content {
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh {
  overflow: unset;
}
</style>