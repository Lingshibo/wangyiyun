<template>
  <div class="commsong">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="aa">推荐音乐</el-menu-item>
        <el-menu-item index="2" @click="bb">推荐歌单</el-menu-item>
        <el-menu-item index="3" @click="cc">推荐MV</el-menu-item>
    </el-menu>
    <ul v-if="activeIndex==1" class="list">
        <li v-for="i in commsing" @click="info(i.id)">
            <img :src="i.song.album.picUrl">
            <h3>{{i.song.name}}</h3><br><br><br><br>
            <p>歌手：<span v-for="y in i.song.artists">{{y.name }}</span></p><br>
            <p>专辑：{{i.song.album.name}}</p><br>
            <p>出版公司：{{i.song.album.company}}</p>
            <p class="pp">{{i.song.duration | num}}万人听过</p>
            <div @click.stop="buy(i.id)" v-if="idarr.indexOf(i.id)==-1">购买</div>
            <div v-if="idarr.indexOf(i.id)!=-1" @click.stop="">已购买</div>
        </li>
    </ul>
    <ul v-if="activeIndex==2" class="list">
        <li v-for="i in commsingarr">
          <img :src="i.picUrl">
            <h3 class="qq">{{i.name}}</h3>
            <p class="qq">{{i.copywriter}}</p>
            <p>{{i.playCount | num}}万人听过</p>
        </li>
    </ul>
    <ul v-if="activeIndex==3" class="list">
        <li v-for="i in commmv">
          <img :src="i.picUrl">
            <h3>{{i.name}}</h3><br><br><br>
            <p>歌手：<span v-for="y in i.artists">{{y.name}}&nbsp;&nbsp;</span></p><br>
            <p class="qq">{{i.copywriter}}</p>
            <p>{{i.playCount | num}}万人听过</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Comm",
  data() {
    return {
      activeIndex: "1",
      commsing: [],
      commsingarr: [],
      commmv: [],
      songid: [],
      idarr: []
    };
  },
  methods: {
    aa: function() {
      this.activeIndex = "1";
      window.scrollTo(0, 0);
    },
    bb: function() {
      this.activeIndex = "2";
      window.scrollTo(0, 0);
    },
    cc: function() {
      this.activeIndex = "3";
      window.scrollTo(0, 0);
    },
    info: function(val) {
      this.$router.push({ path: "/info", query: { idd: val } });
    },
    buy: function(val) {
      this.Buy(val);
      this.idarr = this.getBuy();
    }
  },
  mounted: function() {
    this.idarr = this.getBuy();
    this.$http.get("http://musicapi.leanapp.cn/personalized/newsong").then(
      function(res) {
        this.commsing = res.body.result;
      },
      function(err) {
        console.log("推荐歌曲获取错误");
      }
    );

    this.$http.get("http://musicapi.leanapp.cn/personalized").then(
      function(res) {
        this.commsingarr = res.body.result;
      },
      function(err) {
        console.log("推荐歌单获取错误");
      }
    );

    this.$http.get("http://musicapi.leanapp.cn/personalized/mv").then(
      function(res) {
        this.commmv = res.body.result;
      },
      function(err) {
        console.log("推荐MV获取错误");
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
.el-menu-demo {
  position: fixed;
  top: 50px;
  z-index: 10000;
  margin-left: calc((100% - 414px) / 2);
}

.el-menu-demo li {
  width: 138px;
  text-align: center;
  font-size: 20px;
  border-bottom: 2px solid gray;
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
