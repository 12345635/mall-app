<template>
  <!-- 搜索页面处理 -->
  <div class="search-container">
    <div class="search-head">
      <van-icon
        name="arrow-left"
        class="arrow-left"
        @touchend="$router.go(-1)"
      />
      <form action="/" class="search-content">
        <van-search
          v-model="value"
          show-action
          action-text="搜索"
          :placeholder="place"
          @search="onSearch"
          @input="input"
          @focus="focus"
          @clear="clear"
          @blur="blur"
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
    <template>
      <div class="searchHistory" v-show="!showGoods">
        <div
          class="item"
          v-for="item in search"
          :key="item"
          @touchend="onSearch(item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="goods-list" v-show="showGoods">
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
    </template>
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
      // 搜索记录
      search: [],
      time: null,
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      showGoods: false,
    };
  },
  components: {
    GoodsCard,
  },
  computed: mapState(["goodsList", "counterMap"]),
  created() {
    // 清除以下缓存
    this.$store.commit("setGoodsList", []);
    this.search = JSON.parse(localStorage.getItem("search")) || [];
  },
  methods: {
    // 请求商品列表
    onSearch(val) {
      this.$store.commit("setGoodsList", []);
      if (!val) {
        this.value = this.place;
      } else {
        this.value = val;
        this.likeList = [];
        this.$store.dispatch("getGoodsList", {
          page: this.page,
          type: val,
        });
        if (this.search.includes(val)) {
          // 删除数组原有的，保证只有一个
          this.search.splice(this.search.indexOf(val),1);
          // 将原有的添加到最前面，保证实时更新
          this.search.unshift(val)
        } else {
          // 没有就添加一条数据
          this.search.push(val);
        }
        localStorage.setItem("search", JSON.stringify(this.search));
      }
      this.showGoods = true;
    },
    input(val) {
      // 没有值直接返回
      if (!val) {
        return;
      }
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.$api.likeSearch({ likeValue: val }).then((r) => {
          this.likeList = r.result;
          clearTimeout(this.time);
          this.time = null;
        });
      }, 300);
    },
    // 鼠标聚焦事件
    focus() {
      this.showGoods = false;
    },
    // 鼠标失去焦点事件
    blur() {
      this.showGoods = true;
    },
    // 点击清除事件
    clear() {
      this.$store.commit("setGoodsList", []);
    },
    // 处理返回过来的字符串
    formatHtml(item) {
      const reg = new RegExp(this.value, "g");
      return item.replace(reg, this.value.fontcolor("red"));
    },
    // 滚动加载
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
    // 下拉刷新
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
  .goods-list,
  .searchHistory {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
  }
  .searchHistory > .item {
    display: inline-block;
    height: 35px;
    line-height: 35px;
    box-sizing: border-box;
    padding: 0px 15px;
    margin-right: 5px;
    margin-top: 5px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>