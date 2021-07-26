<template>
  <div class="one-bar-container" ref="oneTab">
    <div
      class="bar-item"
      v-for="(item, i) in menuList"
      :key="item.imgURL"
      :class="{ active: index === i }"
      @touchend="scroll(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="img-container">
        <img :src="item.imgURL" alt="" />
      </div>
      <div class="title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: "时令水果",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
        },
        {
          title: "安心乳品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
        },
        {
          title: "休闲零食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
        },
        {
          title: "新鲜蔬菜",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg",
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
        },
        {
          title: "粮油调味",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg",
        },
        {
          title: "某手美食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg",
        },
        {
          title: "纸杯清洁",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg",
        },
        {
          title: "个人护理",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg",
        },
        {
          title: "美妆护肤",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg",
        },
        {
          title: "家居收纳",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
        },
        {
          title: "家用电器",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
        },
        {
          title: "3C数码",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
        },
        {
          title: "母婴用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
        },
        {
          title: "宠物用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
        },
        {
          title: "图书玩具",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg",
        },
        {
          title: "手表配饰",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
        },
      ],
    };
  },
  methods: {
    scroll(index, e) {
      if (this.move) {
        return;
      }
      this.index = index;
      const { oneTab } = this.$refs;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const warpperWidth = this.$refs.oneTab.offsetWidth;
      oneTab.scrollLeft += itemWidth / 2 + itemLeft - warpperWidth / 2;
      this.$store.dispatch("getLeftMeun", {
        type: this.menuList[this.index].title,
      });
      this.$store.commit("setIndex", 0);
    },
  },
  created() {
    this.$store.dispatch("getLeftMeun", { type: this.menuList[0].title });
    this.$store.commit("setIndex", 0);
  },
};
</script>
<style lang="less" scoped>
.one-bar-container {
  display: flex;
  height: 104px;
  overflow: auto;
  scroll-behavior: smooth;
  .bar-item {
    width: 50px;
    padding: 10px 5px;
    height: 70px;
    .img-container {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-width: 2px;
      border-style: solid;
      border-color: transparent;
      border-radius: 23px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    .title {
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .active {
    .img-container {
      background: #fff;
      border-color: #d13193;
    }
    .title {
      color: #fff;
      background: #d13193;
      font-weight: bold;
      border-radius: 30px;
    }
  }
}
.one-bar-container::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>