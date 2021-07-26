<template>
  <div class="home">
    <router-view />
    <tabar />
  </div>
</template>

<script>
import tabar from "../components/taBar.vue"
export default {
  name: 'Home',
  components: {
    tabar,
  }
}
</script>
