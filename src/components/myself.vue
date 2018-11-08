<template>
  <div class="my">
    <div class="title">我的</div>
    <ul v-if="id.length!=0">
      <li v-for="(i,k) in arr" v-if="!arr.length==0&&i.is">
        <img :src="i.imgs">
        <h3>{{i.name}}</h3><br>
        <span v-for="u of i.songer">{{u.name}}</span><br>
        <p class="price">￥{{i.price}}</p>
        <i class="el-icon-circle-close close" @click="close(k)"></i>
      </li>
      <li>
        <span>商品总价：</span>
        <span class="all">￥{{all}}</span>
        <input type="button" value="继续购物" class="qq">
        <input type="button" value="确认结算" class="ww">
      </li>
    </ul>
    <div v-if="id.length==0" class="nu">
      空空如也
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      arr: [],
      all:0,
      id:[]
    };
  },
  mounted: function() {
    this.id=this.getBuy();
    for (const o of this.id) {
      this.$http
        .get("http://musicapi.leanapp.cn/song/detail", {
          params: { ids: o }
        })
        .then(
          function(res) {
            this.arr.push({
              name: res.body.songs[0].al.name,
              imgs: res.body.songs[0].al.picUrl,
              songer:res.body.songs[0].ar,
              price:res.body.songs[0].al.id.toString().charAt(res.body.songs[0].al.id.toString().length-1),
              is:true
            });
            this.all+=parseInt(res.body.songs[0].al.id.toString().charAt(res.body.songs[0].al.id.toString().length-1));
          },
          function(err) {
            console.log("购物车获取错误");
          }
        );
    }
  },
  methods:{
    close:function(index){
      this.arr[index].is=false;
      this.all-=parseInt(this.arr[index].price);
      this.delete(index);
    }
  }
};
</script>

<style scoped>
.my{
  width: 414px;
  margin-left:calc((100% - 414px)/2);;
}

.title {
  width: 414px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: rgb(154, 212, 116);
  color: white;
  font-size: 20px;
}

ul {
  display: inline-block;
  width: 100%;
  padding-bottom: 50px;
}

li {
  width: 414px;
  height: 160px;
  position: relative;
  margin-left: calc((100% - 414px)/2);
}

li:nth-child(odd){
  background-color: white;
}

li:nth-child(even){
  background-color: azure;
}

li:last-child{
  background-color: white;
}

img {
  width: 120px;
  height: 150px;
  float: left;
  margin-top: 5px;
  margin-left: 10px;
}

h3 {
  font-size: 18px;
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
}

span{
  display: inline-block;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 15px;
  color: rgb(108, 112, 112);
}

.price{
  font-size: 28px;
  color: rgb(254, 77, 85);
  display: inline-block;
  margin-left: 10px;
  margin-top: 50px;
}

.close{
  font-size: 20px;
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 380px;
}

.qq{
  border: 1px solid rgb(238, 238, 238);
  background-color: rgb(238, 238, 238);
  outline: none;
  width: 90px;
  height: 30px;
  position: absolute;
  top:120px;
  left: 180px;
}

.ww{
  background-color: rgb(154, 212, 116);
  border: 1px solid rgb(154, 212, 116);
  outline: none;
  width: 120px;
  height: 30px;
  position: absolute;
  top:120px;
  left: 280px;
  color: white;
  font-size: 18px;
}

ul li:last-child span:first-child{
  margin-left: 260px;
}

.all{
  font-size: 28px;
  color: rgb(254, 77, 85);
}

ul li:last-child span{
  margin-top: 40px;
}

.nu{
  width: 414px;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
</style>
