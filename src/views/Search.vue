<template>
    <div class="search-container">
      <div class="search-head">
        <van-icon
          name="arrow-left"
          class="arrow-left"
          @click="handleClick"
        />
        <div class="search-content">
          <van-search
            v-model="value"
            :placeholder="place"
            show-action
            @search="onSearch"
            @input="input"
            @focus="focus"
          >
            <template #action v-if="showList">
              <div @touchend="onSearch(value)">搜索</div>
            </template>
            <template #action v-else>
              <van-icon
                name="shopping-cart-o"
                class="shopping-cart-o"
                :badge="badge"
                id="shop-card"
              />
            </template>
          </van-search>
        </div>
      </div>
      <div class="like-search" v-if="likeList.length && showList">
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
      <div class="goods-list" v-if="goodsList.length && !showList">
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
      <div class="my-history" v-if="likeList.length <= 0 && showList">
        <History :searchList="searchList" @search="onSearch" />
      </div>
    </div>
</template>
<script>
import GoodsCard from "@/components/GoodsCard";
import History from "@/components/History";
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
      page: 0,
      size: 10,
      goodsList: [],
      showList: false,
      total: 0,
      searchList: [],
    };
  },
  components: {
    GoodsCard,
    History,
  },
  computed: {
    ...mapState(["counterMap", "transitionName"]),
    badge() {
      const count = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0
      );
      if (count > 99) {
        return "99+";
      } else if (count <= 0) {
        return "";
      }
      return count;
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem("searchList"));
  },
  methods: {
    onSearch(val) {
      if (val) {
        this.value = val.trim();
        const item = this.searchList.find((item) => item.value == this.value);
        if (item) {
          item.time = new Date().getTime();
          this.searchList.sort((a, b) => b.time - a.time);
        } else {
          this.searchList.unshift({
            value: this.value,
            time: new Date().getTime(),
          });
        }
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
        localStorage.setItem("searchList", JSON.stringify(this.searchList));
        this.likeList = [];
        this.goodsList = [];
        this.page = 0;
        this.onLoad();
        this.showList = true;
      } else {
        this.value = this.place;
      }
    },
    input(val) {
      if (!val) {
        return;
      }
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.$api.likeSearch({ likeValue: val }).then((r) => {
          this.showList = true;
          this.likeList = r.result;
          clearTimeout(this.time);
          this.time = null;
        });
      }, 300);
    },
    focus() {
      this.showList = true;
    },
    formatHtml(item) {
      const reg = new RegExp(this.value, "g");
      return item.replace(reg, this.value.fontcolor("red"));
    },
    async onLoad() {
      if (this.refreshing) {
        this.refreshing = false;
        return;
      }
      this.page += 1;
      const value = await this.$api.search({
        type: this.value,
        page: this.page,
        size: this.size,
      });
      if (!value.total == 0) {
        this.loading = false;
        this.goodsList = this.goodsList.concat(value.list);
        this.total = value.total;
      } else {
        this.goodsList = [];
      }
      this.showList = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
        return;
      }
    },
    async onRefresh() {
      // 清空列表数据
      this.goodsList = [];
      this.page = 1;
      this.finished = false;

      // 重新加载数据
      const value = await this.$api.search({
        type: this.value,
        page: this.page,
        size: this.size,
      });
      this.goodsList = value.list;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = false;
      this.onLoad();
    },
    handleClick(){
      this.$router.goBack(); 
    }
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
    z-index: 100;
    .arrow-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      #shop-card {
        font-size: 15px;
      }
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
  }
  .goods-list {
    position: relative;
    top: 55px;
    margin: 0 auto;
    width: 345px;
    z-index: 10;
    background: #fff;
  }
  .van-pull-refresh {
    overflow: unset;
  }
  .my-history {
    position: absolute;
    width: 350px;
    top: 55px;
    left: 10px;
    z-index: 1;
  }
}
</style>