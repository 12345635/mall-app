<template>
  <div
    class="item"
    v-if="exist"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      opacity,
      transform: `translate(${moveX}px,${moveY}px) scale(${sx},${sy})`,
    }"
  >
  <img :src="src"></div>
</template>
<style lang="less" scoped>
.item {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  transition: 1s;
  transform-origin: 0% 0%;
}
img {
  width: 100%;
  border-radius: 50%;
}
</style>