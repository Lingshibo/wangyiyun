<template>
  <div class="mtops">
      <div class="title">
          {{list.name}}
      </div>
      <!-- <router-link to="/home/tops">返回</router-link> -->
      <div class="buck" @click="buck">返回</div>
    <ul class="list">
        <li v-for="i in list.tracks" @click="info(i.id)">
            <img :src="i.al.picUrl">
            <h3>{{i.al.name | sname}}</h3><br><br><br><br><br>
            <p class="songer">歌手：<span v-for="y in i.ar">{{y.name}}</span></p><br>
            <p class="songer">专辑：{{i.name}}</p><br>
            <p class="pp">{{i.dt | num}}万人听过</p>
            <div @click.stop="buy(i.id)" v-if="idarr.indexOf(i.id)==-1">购买</div>
            <div v-if="idarr.indexOf(i.id)!=-1" @click.stop="">已购买</div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Mtops",
  data() {
    return {
      idx: 0,
      list: {},
      idarr:[]
    };
  },
  mounted: function() {
    this.arr=this.getBuy();
    this.idx = this.$route.query.idx;
    this.$http
      .get("http://musicapi.leanapp.cn/top/list", { params: { idx: this.idx } })
      .then(
        function(res) {
          this.list = res.body.playlist;
        },
        function(err) {
          if (this.idx == 1) {
            console.log("热歌榜获取错误");
          } else if (this.idx == 3) {
            console.log("飙升榜获取错误");
          } else if (this.idx == 5) {
            console.log("UK排行榜获取错误");
          } else if (this.idx == 2) {
            console.log("网易原创歌曲榜获取错误");
          } else {
            console.log("未知错误");
          }
        }
      );
  },
  filters: {
    num: function(val) {
      return Math.round((val / 10000) * 10) / 10;
    },
    sname: function(val) {
      if (val.length > 24) {
        return val.slice(0, 24) + "...";
      }
      return val;
    }
  },
  methods: {
    buck: function() {
      this.$router.push("/home/tops");
    },
    info:function(val){
      this.$router.push({path:"/info",query:{idd:val}});
    },
    buy: function(val) {
      this.Buy(val);
      this.idarr = this.getBuy();
    }
  }
};
</script>

<style scoped>
.buck {
  display: inline-block;
  width: 60px;
  height: 30px;
  background-color: antiquewhite;
  position: absolute;
  top: 60px;
  left: 330px;
  line-height: 30px;
  border-radius: 5px;
  text-align: center;
}

.title {
  width: 100%;
  height: 50px;
  padding-top: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid rgb(180, 169, 169);
}

img {
  width: 120px;
  height: 150px;
  float: left;
  margin-top: 5px;
  margin-left: 10px;
}

.list {
  display: inline-block;
  width: 100%;
  padding-bottom: 50px;
}

.list li {
  width: 414px;
  height: 160px;
  position: relative;
  margin-left: calc((100% - 414px) / 2);
}

h3 {
  font-size: 18px;
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
}

.songer {
  display: inline-block;
  width: 270px;
  color: rgb(108, 112, 112);
  font-size: 13px;
  margin-left: 10px;
}

.list div {
  width: 70px;
  height: 30px;
  border: 1px solid rgb(206, 16, 104);
  position: absolute;
  top: 60px;
  left: 320px;
  z-index: 2;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}

.pp {
  color: rgb(206, 16, 104);
  display: inline-block;
  position: absolute;
  top: 35px;
  left: 310px;
}

.qq {
  display: inline-block;
  width: 240px;
  font-size: 15px;
}
</style>
