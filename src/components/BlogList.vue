<template>
  <div class="container--small">
    <div class="blog-list" v-if="!loading && blogPostsList.length > 0">
      <h1 class="heading text-center">Welcome to blog world</h1>
      <router-link class="card-link" :to="'/blog/' + blog.id" v-for="(blog, index) in blogPostsList" :key="index">
        <div class="card">
          <div class="card__header">
            <div class="card__author-img"></div>
            <div>
              <h1 class="card__title">{{blog.title}}</h1>
              <h2 class="card__author">{{blog.author}}</h2>
            </div>
          </div>
          <div class="card__body">{{blog.content}}</div>
        </div>
      </router-link>
    </div>
    <!-- <div v-else class="text-center">
      <img src="../assets/loader.gif" alt />
    </div> -->
  </div>
</template>

<script>
import {mapActions, mapGetters } from "vuex";
// import axios from "axios";
// import { URL } from "../store/constants";

export default {
  name: "BlogList",
  data() {
    return {
      loading: false,
      blogs: [],
      id:"",
      title:"",
      body:""

    };
  },

  
  methods: {
    // async getAllPostData() {
    //   this.loading = true;
    //   try {
    //     const response = await axios(`${URL}`);
    //     this.blogs = response.data.slice(0, 10);
    //     this.$store.commit("setBlogData", this.blogs);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     this.loading = false;
    //   }
    // }
    ...mapActions(["fetchUsers", "deleteUser"])

  },
  computed: mapGetters(["blogPostsList"]),
  created() {
    // this.getAllPostData();
    console.log("blogPostsList", this.blogPostsList)
    this.fetchUsers();
  },
  
};
</script>

<style scoped lang="scss">
.card-link {
  display: block;
  text-decoration: none;
}

.card {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 24px 0;

  &__header,
  &__body,
  &__footer {
    padding: 0.75rem 1.25rem;
    color: #333;
  }

  &__title,
  &__author,
  &__body {
    line-height: 28px;
  }

  &__header,
  &__footer {
    margin-bottom: 0;
    background-color: #e1ecf4;
    border-bottom: 1px solid #e1ecf4;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__title {
    color: #333;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  &__author {
    color: #666;
    font-size: 13px;

    &-img {
      min-width: 50px;
      width: 50px;
      height: 50px;
      background: #666;
      border-radius: 50%;
      margin-right: 12px;
    }
  }

  .edit-icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    margin-left: 12px;
    background: url("../assets/edit.svg") #e1ecf4 no-repeat;
    display: inline-block;
    background-size: 20px;
    background-position: center center;

    &:hover {
      background: url("../assets/edit.svg") #d1e5f1 no-repeat;
      background-size: 20px;
      background-position: center center;
    }
  }

  .delete-icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    margin-left: 12px;
    background: url("../assets/delete.svg") #e1ecf4 no-repeat;
    display: inline-block;
    background-size: 20px;
    background-position: center center;

    &:hover {
      background: url("../assets/delete.svg") #d1e5f1 no-repeat;
      background-size: 20px;
      background-position: center center;
    }
  }
}
</style>
