import Vue from "vue"
import com from "./index.vue"

const Animate = Vue.extend(com);

export default function ({
  startX, startY, endX, endY, src, width, height
}) {
  const app = new Animate({
    el: document.createElement("div"),
    data() {
      return {
        // 开始的位置
        moveX: startX,
        moveY: startY,
        // 图片地址
        src: src,
        // 没有缩放
        sx: 1,
        sy: 1,
        opacity: 1,
        // 是否显示，用于v-if
        exist: true,
        // 元素的宽高
        width,
        height
      }
    }
  });
  // 插入到页面中去
  document.body.appendChild(app.$el);
  // 开启一个计时器
  setTimeout(() => {
    // 将元素移动到购物车位置
    app.moveX = endX;
    app.moveY = endY;
    // 缩小到0.1
    app.sx = 0.1;
    app.sy = 0.1;
    // 透明度为0
    app.opacity = 0;
    // 开启一个计时器，删除元素
    setTimeout(() => {
      app.exist = false;
    }, 1000)
  }, 0);

}