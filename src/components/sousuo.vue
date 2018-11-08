<template>
  <div class="sousuo">
    <Seach @keyup.enter.native="select()"></Seach>
    <h4 v-if="xx">热门搜索</h4><br/>
    <span v-for="i in hotSong" v-if="xx" class="uu" @click="yy(i.first)">{{i.first}}</span>
    <ul v-if="!xx" class="list">
    <li v-for="i in hotSong" @click="info(i.id)">
        <h3>{{i.name}}</h3>
        <i class="el-icon-caret-right mv" v-if="i.alias.length>0"></i>
        <span v-for="y in i.artists">{{y.name}}</span><span>-{{i.album.name}}</span>
    </li>
    </ul>
  </div>
</template>

<script>
import Seach from "./seach";
export default {
  name: "Sousuo",
  data() {
    return {
      zzz: "",
      hotSong: [],
      xx: true
    };
  },
  components: {
    Seach
  },
  methods: {
    select: function() {
      this.zzz = this.$route.query.input1;
      this.xx = false;
      if (this.zzz == "" || this.zzz == null) {
        return false;
      }
      this.$http
        .get("http://musicapi.leanapp.cn/search", {
          params: { keywords: this.zzz }
        })
        .then(
          function(res) {
            this.hotSong = res.body.result.songs;
          },
          function(err) {
            console.log("搜索获取错误");
          }
        );
    },
    yy: function(val) {
      this.xx = false;
      this.$http
        .get("http://musicapi.leanapp.cn/search", {
          params: { keywords: val }
        })
        .then(
          function(res) {
            this.hotSong = res.body.result.songs;
          },
          function(err) {
            console.log("搜索获取错误");
          }
        );
    },
    info:function(val){
      this.$router.push({path:"/info",query:{idd:val}});
    }
  },
  mounted: function() {
    this.$http.get("http://musicapi.leanapp.cn/search/hot").then(
      function(res) {
        this.hotSong = res.body.result.hots;
      },
      function(err) {
        console.log("热搜获取错误");
      }
    );
  },
  filters: {
    num: function(val) {
      return Math.round((val / 10000) * 100) / 100;
    }
  }
};
</script>

<style scoped>
h4 {
  font-size: 20px;
  display: inline-block;
  margin: 10px 20px;
  margin-top: 70px;
}

.uu {
  display: inline-block;
  width: auto;
  height: 20px;
  background-color: rgb(230, 230, 230);
  margin: 10px 20px;
  padding: 3px 10px;
  border-radius: 50px;
}

ul {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

li {
  width: 414px;
  border-bottom: 1px solid rgb(180, 169, 169);
  position: relative;
}

ul span {
  font-size: 12px;
  display: inline-block;
  margin-left: 22px;
  color: rgb(121, 110, 110);
  margin-top: 5px;
  margin-bottom: 5px;
}

ul h3 {
  font-size: 14px;
  margin-left: 22px;
  color: dodgerblue;
  margin-top: 5px;
}

.mv{
  display: inline-block;
  width: 20px;
  height: 12px;
  position:absolute;
  top: 10px;
  left: 380px;
  text-align: center;
  line-height: 12px;
  border: 1px solid rgb(121, 110, 110);
  border-radius: 5px;
}
</style>
