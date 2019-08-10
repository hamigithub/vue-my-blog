<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <p>{{blog.content}}</p>
    <button @click="deleteSingleBlog()">删除</button>
    <router-link :to="'/edit/'+id">
      <button>编辑</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "single-blog",
    data() {
      return {
        id: this.$route.params.id,
        blog: {}
      };
    },
    created() {
      // this.$http
      //   .get("https://jsonplaceholder.typicode.com/posts/" + this.id)
      //   .then(function (data) {
      //     this.blog = data.body;
      //   });

      Bmob.Query("Blogs")
        .get(this.id)
        .then(res => {
          this.blog = res;
        })
        .catch(err => {
          console.log(err);
        });

    },
    methods: {
      deleteSingleBlog() {
        Bmob.Query('Blogs').destroy(this.id).then(res => {
          this.$router.push({path: '/'});
        }).catch(err => {
          console.log(err)
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #single-blog {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background: #eee;
    border: 1px dotted #aaa;
  }
</style>
