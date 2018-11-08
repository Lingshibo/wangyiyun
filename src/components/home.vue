<template>
  <div class="home">
    <Seach v-if="tt" v-show="qq"></Seach>
    <router-view></router-view>
    <div class="bottomNav">
        <div>
            <router-link to="/home/comm"><i :class="recomm ? 'icon-shu':'icon-shu1'" class="iconfont" @click="recommz()"></i></router-link>
            <p>推荐</p>
        </div>
        <div>
            <i :class="tips ? 'icon-paihangbang':'icon-paihangbang1'" class="iconfont" @click="tipsz()"></i>
            <p>排行榜</p>
        </div>
        <div>
           <i :class="my ? 'icon-wode1':'icon-wode'" class="iconfont" @click="myz()"></i> 
           <p>我的</p>
        </div>
    </div>
  </div>
</template>

<script>
import Seach from "./seach";
export default {
  name: "Home",
  data() {
    return {
      recomm: true,
      tips: false,
      my: false,
      tt: true,
      qq: true
    };
  },
  components: {
    Seach
  },
  methods: {
    recommz: function() {
      this.recomm = true;
      this.tips = false;
      this.my = false;
      window.scrollTo(0, 0);
      this.$router.push("/home/comm");
      this.qq = true;
    },
    tipsz: function() {
      this.recomm = false;
      this.tips = true;
      this.my = false;
      window.scrollTo(0, 0);
      this.$router.push("/home/tops");
      this.qq = true;
    },
    myz: function() {
      this.recomm = false;
      this.tips = false;
      this.my = true;
      window.scrollTo(0, 0);
      this.$router.push("/home/myself");
      this.qq = false;
    }
  },
  mounted: function() {
    if (this.$route.path == "/home/comm") {
      this.recomm = true;
      this.tips = false;
      this.my = false;
      this.qq = true;
    } else if (this.$route.path == "/home/tops") {
      this.recomm = false;
      this.tips = true;
      this.my = false;
      this.qq = true;
    } else if (this.$route.path == "/home/myself") {
      this.recomm = false;
      this.tips = false;
      this.my = true;
      this.qq = false;
    } else if (this.$route.path == "/") {
      this.recomm = true;
      this.tips = false;
      this.my = false;
      this.qq = true;
    } else {
      this.recomm = false;
      this.tips = true;
      this.my = false;
      this.qq = true;
    }
  }
};
</script>

<style scoped>
.bottomNav {
  width: 100%;
  height: 50px;
  border-top: 1px solid gray;
  position: fixed;
  bottom: 0px;
  z-index: 10000;
}

.bottomNav div {
  width: 138px;
  height: 100%;
  float: left;
  text-align: center;
  background-color: white;
}

.bottomNav div:nth-child(1) {
  margin-left: calc((100% - 414px) / 2);
}

.bottomNav div p {
  font-size: 12px;
}

.bottomNav div i {
  font-size: 25px;
  display: inline-block;
  margin-top: 5px;
}
</style>
