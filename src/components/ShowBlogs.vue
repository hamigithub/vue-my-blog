<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div class="single-blog" v-for="blog in filteredBlogs" :key="blog.title">
      <router-link v-bind:to="'/blog/'+blog.objectId">
        <h2 v-dark>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <article>{{blog.content | snippet}}</article>
    </div>
  </div>
</template>

<script>
  export default {
    name: "show-blogs",
    data() {
      return {
        blogs: [],
        search: ""
      };
    },
    created() {
      // this.$http.get("./../static/posts.json").then(function(data) {
      //   console.log(data);
      //   this.blogs = data.body.slice(0, 10);
      //   console.log(data.body);
      //   console.log(this.blogs);
      // });
      //项目其他页面使用跟小程序一样使用Bmob对象即可，例如：
      // Bmob.Query("Blogs")
      //   .get("2b642759ab")
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      const query = Bmob.Query("Blogs");
      query.find().then(res => {
        this.blogs = res.slice(0, 10);
      });
    },
    computed: {
      filteredBlogs: function () {
        return this.blogs.filter(blog => {
          return blog.title.match(this.search);
        });
      }
    },
    //局部定义 过滤器 和 自定义指令
    filters: {
      // "to-uppercase": function (value) {
      //   return value.toUpperCase();
      // }
      toUppercase(value) {
        return value.toUpperCase();
      }
    },
    directives: {
      dark: {
        bind(el, binding, vnode) {
          el.style.color = "red";
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #show-blogs {
    max-width: 800px;
    margin: 0 auto;
  }

  .single-blog {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
    border: 1px dotted #aaa;
  }

  #show-blogs a {
    color: #444;
    text-decoration: none;
  }

  input[type="text"] {
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
