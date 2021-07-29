<template>
  <div class="shopping-container">
    <div class="top-bar">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del" />
    </div>
    <div class="card-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in shopList" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <GoodsCard v-bind="item" :num="counterMap[item.id]" :onify="true" />
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="allMonery"
      :button-text="`结算${totalNum}`"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="toggleAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import GoodsCard from "@/components/GoodsCard";
import { Dialog, Toast } from "vant";
import { mapState } from "vuex";
export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      shopList: [],
      result: [],
      checked: false,
    };
  },
  computed: {
    ...mapState(["counterMap"]),
    totalNum() {
      const result = this.shopList.filter((item) =>
        this.result.includes(item.id)
      );
      const res = result.reduce(
        (prev, next) => prev + this.counterMap[next.id],
        0
      );
      return res;
    },
    allMonery() {
      const result = this.shopList.filter((item) =>
        this.result.includes(item.id)
      );
      return result.reduce((prev, next) => {
        const res = this.counterMap[next.id];
        if (next.price_off) {
          return prev + Math.round(res * next.price_off * 100);
        }
        return prev + Math.round(res * next.price * 100);
      }, 0);
    },
  },
  created() {
    this.getAllData();
  },
  watch: {
    result() {
      if (this.result.length === this.shopList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    getAllData() {
      const result = Object.keys(this.counterMap);
      this.$api.getGoodsByIds(result.join()).then((value) => {
        this.shopList = value.list;
      });
    },
    async del() {
      if (this.result.length) {
        try {
          await Dialog.confirm({ message: "是否确定删除商品" });
          this.result.forEach((id) => {
            console.log(id)
            this.$store.commit("storageChange", { id, value: -Infinity });
            this.shopList = this.shopList.filter((item) =>!item.id === id);
          });
          this.getAllData();
        } catch (error) {
          console.log(error)
          Toast("用户点击了取消");
        }
      } else {
        Toast("请选择要删除的商品");
      }
    },
    onSubmit() {},
    toggleAll() {
      this.checked
        ? this.$refs.checkboxGroup.toggleAll(true)
        : this.$refs.checkboxGroup.toggleAll(false);
    },
  },
};
</script>
<style lang="less" scoped>
.shopping-container {
  background: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .van-submit-bar {
    position: fixed;
    bottom: 50px;
  }
}
</style>