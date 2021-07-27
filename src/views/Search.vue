<template>
  <div class="search-container">
    <div class="search-head">
      <van-icon name="arrow-left" class="arrow-left" />
      <form action="/" class="search-content">
        <van-search
          v-model="value"
          show-action
          action-text="搜索"
          :placeholder="place"
          @search="onSearch"
          @input="input"
          @focus="focus"
        />
      </form>
    </div>
    <div class="like-search">
      <van-list>
        <van-cell
          v-for="item in likeList"
          :key="item.id"
          @click="onSearch(item)"
        >
          <template>
            <span class="custom-title" v-html="formatHtml(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list">
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
      place: "请输入搜索",
      value: this.place,
      likeList: [],
      time: null,
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
    };
  },
  components: {
    GoodsCard,
  },
  computed: mapState(["goodsList", "counterMap"]),
  methods: {
    onSearch(val) {
      if (!val) {
        this.value = this.place;
      } else {
        this.value = val;
        this.likeList = [];
        this.$store.dispatch("getGoodsList", {
          page: this.page,
          type: val,
        });
      }
    },
    input(val) {
      if (!val) {
        return;
      }
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.$api.likeSearch({ likeValue: val }).then((r) => {
          console.log(r);
          this.likeList = r.result;
          clearTimeout(this.time);
          this.time = null;
        });
      }, 300);
    },
    focus() {},
    formatHtml(item) {
      const reg = new RegExp(this.value, "g");
      return item.replace(reg, this.value.fontcolor("red"));
    },
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
  },
};
</script>
<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 100vh;
  z-index: 110;
  background: #fff;
  .search-head {
    display: flex;
    width: 345px;
    background: #fff;
    margin: auto;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    .arrow-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1 1 auto;
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
  }
  .goods-list{
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
  }
}
</style>