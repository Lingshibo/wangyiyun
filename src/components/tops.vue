<template>
  <div class="tops">
    <el-carousel height="150px" class="ww">
      <el-carousel-item v-for="item in imgs.slice(0,5)" :key="item.index">
        <img :src="item.picUrl">
      </el-carousel-item>
    </el-carousel>
    <div class="hh hh1" @click="hotTops()">
        <i class="el-icon-menu"></i>
    </div>
    <p class="rr1">云音乐热歌榜</p>
    <div class="hh hh2" @click="rushTops()">
        <i class="el-icon-mobile-phone"></i>
    </div>
    <p class="rr2">云音乐飙升榜</p>
    <div class="hh hh3" @click="ukTops()">
        <i class="el-icon-bell"></i>
    </div>
    <p class="rr3">UK排行榜周榜</p>
    <div class="hh hh4" @click="myselfTops()">
        <i class="el-icon-star-on"></i>
    </div>
    <p class="rr4">网易原创歌曲榜</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Tops",
  data() {
    return {
      imgs: []
    };
  },
  mounted: function() {
    this.$http.get("http://musicapi.leanapp.cn/banner").then(
      function(res) {
        this.imgs = res.body.banners;
      },
      function(err) {
        console.log("轮播图获取错误");
      }
    );
  },
  methods: {
    hotTops: function() {
      this.$router.push({
        path: "/home/mtops",
        query: { idx: "1" }
      });
    },
    rushTops: function() {
      this.$router.push({
        path: "/home/mtops",
        query: { idx: "3" }
      });
    },
    ukTops: function() {
      this.$router.push({
        path: "/home/mtops",
        query: { idx: "5" }
      });
    },
    myselfTops: function() {
      this.$router.push({
        path: "/home/mtops",
        query: { idx: "2" }
      });
    }
  }
};
</script>

<style scoped>
.ww {
  margin-top: 60px;
}

.el-carousel__item img {
  height: 100%;
  width: 100%;
}

.hh {
  width: 100px;
  height: 100px;
  float: left;
  /* margin: 30px 20px; */
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  color: white;
}

.tops {
  position: relative;
}

.hh1 {
  background-color: sandybrown;
  margin-left: calc((100% - 250px) / 2);
  margin-top: 80px;
}

.hh2 {
  background-color: darkturquoise;
  margin-left: 40px;
  margin-top: 80px;
}

.hh3 {
  background-color: cornflowerblue;
  margin-left: calc((100% - 250px) / 2);
  margin-top: 40px;
}

.hh4 {
  background-color: deeppink;
  margin-top: 40px;
  margin-left: 40px;
}

p {
  display: inline-block;
  position: absolute;
}

.rr1 {
  top: 335px;
  left: 83px;
}

.rr2 {
  top: 335px;
  left: 223px;
}

.rr3 {
  left: 83px;
  top: 480px;
}

.rr4 {
  left: 220px;
  top: 480px;
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
  padding-top: 110px;
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

.list p {
  display: inline-block;
  color: rgb(108, 112, 112);
  height: 13px;
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
