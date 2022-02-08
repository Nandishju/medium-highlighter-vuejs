<template>
  <div class="container--small">
    <div class="blog" v-if="!loading">
      <h1 class="heading">Blog Detail</h1>
      <h2
        class="subheading"
      >You can highlight the text by clicking on tooltip and if you will click on highlighted text then you can get the matched blog list</h2>
      <div class="my-12">
        <router-link to="/" class="button button--text">Back</router-link>
      </div>

      <HighLight @highlight="onHighlight">
        <p v-html="blog.content" id="para" ref="para"></p>
      </HighLight>

      <!-- Preview -->
      <div class="card" v-for="pre in previewObj" :key="pre.id" :id="pre.id" ref="pre.id">
        <div class="card__inner">
          <div class="card__header">
            <div class="card__author-img"></div>
            <div>
              <h1 class="card__title">{{pre.title}}</h1>
              <h2 class="card__author">author</h2>
            </div>
          </div>
          <div class="card__body" v-html="pre.content"></div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <img src="../assets/loader.gif" alt="loader" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import HighLight from "./HighLight";
// import { URL } from "../store/constants";

export default {
  name: "Blog",
  components: {
    HighLight
  },
  data() {
    return {
      loading: false,
      id: this.$route.params.id,
      blog: {},
      highLightArr: [],
      tempArr: [],
      previewObj: [],
      partialHighLightArr: []
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    if (sessionStorage.highLightArr) {
      this.partialHighLightArr = sessionStorage.highLightArr.split(",");
    }
  },
  watch: {
    highLightArr(newName) {
      sessionStorage.highLightArr = newName;
    }
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const responseList = await axios(`http://localhost:3000/blogPosts`);
        const response = await axios(`http://localhost:3000/blogPosts/${this.id}`);

        this.blogs = responseList.data.slice(0, 10);
        // this.$store.commit("setBlogData", this.blogs);

        this.blog = response.data;
        this.partialHighLightArr.forEach(item => {
          if (this.blog.content.indexOf(item) > -1) {
            this.blog.content = this.blog.content.replace(
              item,
              '<span class="highlight">' + item + "</span>"
            );
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    onHighlight(text) {
      if (window.getSelection().rangeCount > 0) {
        if (
          text.match(/[a-z]/i) ||
          text.match(/[A-Z]/i) ||
          text.match(/[0-9]/i)
        ) {
          this.tempArr.push(text);

          this.highLightArr = [...new Set(this.tempArr)];

          if (this.partialHighLightArr.length > 0) {
            this.highLightArr = [
              ...this.partialHighLightArr,
              ...this.highLightArr
            ];
          }

          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          if (range && !selection.isCollapsed) {
            if (
              selection.anchorNode.parentNode == selection.focusNode.parentNode
            ) {
              const span = document.createElement("span");
              span.className = "highlight";
              span.appendChild(range.extractContents());
              range.insertNode(span);
              span.onclick = this.previewHandler;
            }
          }
        } else {
          alert("can not be highlighted");
        }
      }
    },
    previewHandler() {
      this.previewObj = this.blogArr.filter(item => {
        // for (const key in this.highLightArr) {
        //   if (item.body.toLowerCase().includes(this.highLightArr[key])) {
        //     item.body = item.body.replace(this.highLightArr[key], `<span class="highlight"> ${ this.highLightArr[key] } </span>`)
        //     return true;
        //   }
        // }
        if (
          item.content
            .toLowerCase()
            .includes(this.highLightArr[this.highLightArr.length - 1])
        ) {
          item.content = item.content.replace(
            this.highLightArr[this.highLightArr.length - 1],
            `<span class="highlight"> ${
              this.highLightArr[this.highLightArr.length - 1]
            } </span>`
          );
          return true;
        }
      });
    }
  },
  computed: {
    ...mapState(["blogArr", "paraValue"])
  }
};
</script>

<style scoped lang="scss">
  #para {
    line-height: 28px;
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
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
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

<style>
.highlight {
  background: #ffff00;
  border-radius: 4px;
  cursor: pointer;
}

.button--text {
  background: url("../assets/arrow.svg") #e1ecf4 no-repeat 18% center;
  background-size: 20px;
}
</style>