<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AddBlog',
  components: {
    Nav: () => import('@/components/Nav.vue')
  }
}
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
