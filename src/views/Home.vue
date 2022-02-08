<template>
  <div class="home">
    <BlogList />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    BlogList: () => import ('@/components/BlogList.vue')
  }
}
</script>
