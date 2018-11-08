<template>
  <div class="seach">
    <el-input :placeholder="place" v-model="aaa" @keyup.enter.native="select()" type="Search" class="aa" @click.native="soso()"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
  </div>
</template>

<script>
export default {
  name: "Seach",
  data() {
    return {
      place: "音乐 / 专辑 / 歌手 / 歌单",
      aaa:""
    };
  },
  methods: {
    soso: function() {
      this.$router.push("/home/sousuo");
    },
    select:function(){
      this.$router.push({
        path: "/home/sousuo",
        query: { input1: this.aaa }
      });
    }
  }
};
</script>

<style scoped>
.aa {
  width: 370px;
  margin-left: calc((100% - 370px) / 2);
  margin-top: 10px;
  position: fixed;
  top: 0;
}

.seach{
  width: 100%;
  height: 50px;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
}
</style>
