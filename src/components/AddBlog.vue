<template>
  <div class="container--small">
    <div class="add-blog">
      <h2 class="heading">Add a new blog post</h2>
      <form @submit.prevent="onBlogSubmit">
        <div class="my-12">
          <label>ID</label>
          <input type="text" placeholder="Enter ID" v-model="id" />
        </div>
        <div class="my-12">
          <label>Title</label>
          <input type="text" placeholder="Enter title" v-model="title" />
        </div>
        <div class="my-12">
          <label>Author</label>
          <input type="text" placeholder="Enter author name" v-model="author" />
        </div>
        <div class="my-12">
          <label>Content</label>
          <textarea placeholder="Enter blog content" v-model="content"></textarea>
        </div>
        <div class="my-12">
          <button class="button button--primary" type="submit">Create</button>
        </div>
      </form>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddBlog",
  data() {
    return {
      id:'',
      title:'',
      author:"",
      content:''
    };
  },
  
  computed: mapGetters(["cardsList"]),
    created() {
      this.fetchUsers()
    },
  methods: {
     ...mapActions(["addUsers"]),
    onBlogSubmit() {
      if (this.title == '' || this.author == '' || this.content == '') {
        alert("Please fill all the fields")
      }
      else{
         this.addUsers({
          id: this.id,
          title: this.title,
          author: this.author,
          content: this.content
        })
      }     
    },
     ...mapActions(["fetchUsers", "deleteUser"]),

  }
};
</script>

<style scoped lang="scss">
</style>
