<template>
  <div class="nav">
    <div class="nav__left">
      <h1 class="logo">
        <a href="javascript:void(0);">
          <img src="../assets/logo-new.jpg" alt="Logo" width="45" height="45" />
        </a>
      </h1>
      <ul class="flex-div">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/add-blog">Add Blog</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="js">
// import { Component, Prop, Vue } from "vue-property-decorator";

// @Component
// export default class Nav extends Vue {
//   @Prop() private msg!: string;
// }
</script>

<style scoped lang="scss">
.nav {
  font-family: 'Roboto', sans-serif;
  padding: 12px 24px;
box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);

  &__left {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    padding: 24px;
    font-weight: 400;
    color: #333;
    font-size: 17px;

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      outline: none;
    }

    &.router-link-exact-active {
      color: #42b983;
      font-weight: 600;
      opacity: 1;
    }
  }
}
</style>
