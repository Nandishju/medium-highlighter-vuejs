import axios from 'axios'

const state = { 
    blogPosts: []
};

const getters = { 
    blogPostsList: state => state.blogPosts
};

const actions = { 
    async fetchBlogs({commit}){
      const response = await axios.get("http://localhost:3000/blogPosts");
      commit("setUsers", response.data)
      console.log("blogPostsList", response.data)

    },
    async addBlogsUses({commit}, user){
      const response = await axios.post("http://localhost:3000/blogPosts", user)
      .then(value => {
            if (value.status === 201) {
              alert("created successfully");
            }
          })
          .catch(err => {
            alert(err);
          });
      commit("addBlogsUses", response)
    }
};

const mutations = { 
    setUsers: (state, blogPosts) => (
        state.blogPosts = blogPosts
    ),
    addBlogsUses: (state, user) => state.blogPosts.unshift(user),
    // removeUser: (state, id) => (
    //     state.blogPosts.filter(user => user.id !== id),
    //     state.blogPosts.splice(user => user.id, 1)
    // )
};

export default {
    state,
    getters,
    actions,
    mutations
}