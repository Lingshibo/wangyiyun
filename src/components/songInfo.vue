<template>
  <div class="song">
    <div class="topDiv">
        <div class=topTitle>
            <i class="el-icon-arrow-left" @click="buck()"></i>
            <i class="el-icon-service"></i>
            <span>歌曲</span>
        </div>
        <img :src="arr.al.picUrl">
    </div>
    <div class="matter">
        <h2>{{arr.al.name}}</h2>
        <p style="margin-top:10px">发行时间：{{arr.publishTime}}</p>
        <p>歌曲原唱：{{arr.ar[0].name}}</p>
        <p>所属专辑：{{arr.name}}</p>
        <div class="price">
            <p>网易云评分</p>
            <h3>{{arr.fee}}</h3>
            <p>{{arr.dt}}人</p>
        </div>
        <div @click="buy(id)" v-if="idarr.indexOf(id)==-1" class="aa">购买</div>
        <div v-if="idarr.indexOf(id)!=-1" class="aa">已购买</div>
    </div>
    <div class="info">
        <p>歌曲鉴赏</p>
        <h4>{{arr.alia}}</h4>
        <p style="margin-top:10px">歌手</p>
        <div v-for="w in songer" class="songer">
          <img :src="w.imgs">
          <h4>{{w.name}}</h4>
        </div>
    </div>
    <div class="talkDiv">评论</div>
    <ul>
        <li v-for="i in comm">
            {{i.content}}
            <p>{{i.time | time}}</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      arr: {},
      comm: [],
      id:0,
      songerid: [],
      songer: [],
      idarr:[]
    };
  },
  mounted: function() {
    this.id=this.$route.query.idd;
    this.idarr = this.getBuy();
    this.$http
      .get("http://musicapi.leanapp.cn/song/detail", {
        params: { ids: this.id }
      })
      .then(
        function(res) {
          this.arr = res.body.songs[0];
          if (this.arr.alia == null || this.arr.alia == "") {
            this.arr.alia = "暂无";
          }
          for (const i of this.arr.ar) {
            this.$http
              .get("http://musicapi.leanapp.cn/artists", {
                params: { id: i.id }
              })
              .then(
                function(res) {
                  this.songer.push({
                    name: res.body.artist.name,
                    imgs: res.body.artist.img1v1Url
                  });
                },
                function(err) {
                  console.log("歌手详情获取错误！");
                }
              );
          }
        },
        function(err) {
          console.log("歌曲详情获取错误！");
        }
      );

    this.$http
      .get("http://musicapi.leanapp.cn/comment/music", {
        params: { id: this.$route.query.idd }
      })
      .then(
        function(res) {
          this.comm = res.body.comments;
        },
        function(err) {
          console.log("歌曲评论获取错误！");
        }
      );
  },
  filters: {
    time: function(val) {
      var date = new Date(val);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    }
  },
  methods: {
    buck: function() {
      this.$router.back(-1);
    },
    buy: function(val) {
      this.Buy(val);
      this.idarr = this.getBuy();
    }
  }
};
</script>

<style scoped>
.song{
  width: 414px;
  margin-left: calc((100% - 414px)/2);
}

.topDiv {
  width: 414px;
  height: 414px;
  background-color: black;
}

.topTitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.topTitle i {
  color: white;
  font-size: 25px;
}

.topTitle span {
  color: white;
}

.topTitle i:nth-child(2) {
  margin-left: 140px;
}

.topDiv img {
  width: 320px;
  height: 320px;
  margin-left: 42px;
}

.matter {
  width: 374px;
  min-height: 180px;
  background-color: rgb(205, 218, 218);
  padding: 20px 20px;
  border-bottom: 1px solid rgb(108, 112, 112);
}

p {
  color: rgb(108, 112, 112);
}

.price {
  width: 100px;
  height: 100px;
  background-color: white;
  line-height: 35px;
  text-align: center;
  position: absolute;
  top: 430px;
  left: 280px;
}

h4 {
  margin-top: 10px;
}

.price h3 {
  font-size: 40px;
}

.aa {
  width: 80%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: coral;
  border: 1px solid coral;
  margin-left: 10%;
  margin-top: 30px;
}

.info {
  width: 374px;
  min-height: 110px;
  background-color: rgb(205, 218, 218);
  padding: 20px 20px;
}

.talkDiv {
  width: 100%;
  height: 50px;
  background-color: rgb(187, 199, 199);
  font-size: 20px;
  text-align: center;
  line-height: 50px;
}

ul {
  width: 374px;
  min-height: 180px;
  background-color: rgb(205, 218, 218);
  padding: 20px 20px;
}

li {
  margin-top: 20px;
}

.songer:nth-child(odd) {
  display: inline-block;
  margin: 10px 0px 0px 0px;
  text-align: center;
}

.songer:nth-child(even) {
  display: inline-block;
  margin: 10px 70px 0px 0px;
  text-align: center;
}

.songer img {
  width: 150px;
  height: 180px;
}
</style>
