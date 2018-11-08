
<template>
    <div class="registered">
        <div class="title">注册</div>
        <h1>欢迎进入网易云音乐</h1>
        <div class="demo-input-suffix">
            <el-input placeholder="手机号 / 邮箱" class="aa" v-model="phonenum" @blur="phoneyz()"></el-input>
            <div class="phoneshow1" v-if="phone.info">{{phone.title}}</div>
            <div class="phoneshow2" v-if="phone.info"></div>
            <el-input :type="passwordinfo" placeholder="密码（字母开头，最少六位,最多16位）" class="aa" v-model="password" @blur="pwdyz()"><i slot="suffix" class="el-input__icon el-icon-view" @click="ppp"></i></el-input>
            <div class="phoneshow1" style="top:180px;" v-if="pwd.info">{{pwd.title}}</div>
            <div class="phoneshow2" style="top:220px;" v-if="pwd.info"></div>
            <el-input placeholder="昵称" class="aa" v-model="nickname" @blur="nickyz()"></el-input>
            <div class="phoneshow1" style="top:230px;" v-if="nick.info">{{nick.title}}</div>
            <div class="phoneshow2" style="top:270px;" v-if="nick.info"></div>
            <el-button type="success" class="bb" @click="regist">注册</el-button>
            <p>点击【注册】代表你已经阅读并同意用户使用协议</p>
        </div>
        <router-link to="/login" style="color:rgb(66, 188, 87);">已有账号？去登录-></router-link>
    </div>
</template>

<script>
export default {
  name: "Registered",
  data() {
    return {
      phonenum: "",
      password: "",
      nickname: "",
      passwordinfo: "password",
      phone: { info: false, title: "", condition: false },
      pwd: { info: false, title: "", condition: false },
      nick: { info: false, title: "", condition: false }
    };
  },
  methods: {
    phoneyz: function() {
      if (this.phonenum == null || this.phonenum == "") {
        this.phone.info = true;
        this.phone.title = "此项不能为空";
        this.phone.condition=false;
        return false;
      }

      if (
        /^1[34578]\d{9}$/.test(this.phonenum) == false &&
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/.test(
          this.phonenum
        ) == false
      ) {
        this.phone.info = true;
        this.phone.title = "此项格式错误";
        this.phone.condition=false;
        return false;
      }

      if (
        /^1[34578]\d{9}$/.test(this.phonenum) == true ||
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/.test(
          this.phonenum
        ) == true
      ) {
        this.phone.info = false;
        this.phone.title = "";
        this.phone.condition = true;
      }
    },
    ppp: function() {
      if (this.passwordinfo == "password") {
        this.passwordinfo = "text";
      } else {
        this.passwordinfo = "password";
      }
    },
    pwdyz: function() {
      if (this.password == null || this.password == "") {
        this.pwd.info = true;
        this.pwd.title = "此项不能为空";
        this.pwd.condition=false;
        return false;
      }

      if (
        /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password) ==
        false
      ) {
        this.pwd.info = true;
        this.pwd.title = "此项格式错误";
        this.pwd.condition=false;
      } else {
        this.pwd.info = false;
        this.pwd.title = "";
        this.pwd.condition = true;
      }
    },
    nickyz: function() {
      if (this.nickname == null || this.nickname == "") {
        this.nick.info = true;
        this.nick.title = "此项不能为空";
        this.nick.condition=false;
        return false;
      }

      if (/^[0-9a-zA-Z\u4e00-\u9fa5_]{4,16}$/.test(this.nickname) == false) {
        this.nick.info = true;
        this.nick.title = "此项格式错误";
        this.nick.condition=false;
      } else {
        this.nick.info = false;
        this.nick.title = "";
        this.nick.condition = true;
      }
    },
    regist: function() {
      if (
        this.phone.condition == true &&
        this.pwd.condition == true &&
        this.nick.condition == true
      ) {
        localStorage.setItem("phonenum", this.phonenum);
        localStorage.setItem("password", this.password);
        localStorage.setItem("nickname", this.nickname);
        this.$router.push("/login");
      } else {
        this.phoneyz();
        this.pwdyz();
        this.nickyz();
      }
    }
  }
};
</script>

<style scoped>
.registered {
  width: 100%;
  height: auto;
  text-align: center;
}

.title {
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 22px;
  line-height: 40px;
  background-color: rgb(247, 247, 247);
  border-bottom: 1px solid slategrey;
}

h1 {
  color: rgb(66, 188, 87);
  margin-top: 60px;
  letter-spacing: 5px;
}

.demo-input-suffix {
  width: 370px;
  height: 300px;
  margin-left: calc((100% - 370px) / 2);
  margin-top: 30px;
}

.aa {
  width: 100%;
  line-height: 50px;
}

.bb {
  width: 100%;
  height: 40px;
  font-size: 25px;
  line-height: 10px;
}

p {
  display: inline-block;
  margin-top: 20px;
  color: gray;
}

.phoneshow1 {
  width: 130px;
  height: 40px;
  background-color: rgba(192, 107, 103, 0.7);
  position: absolute;
  top: 130px;
  left: 260px;
  text-align: center;
  font-size: 15px;
  letter-spacing: 3px;
  line-height: 40px;
  border-radius: 5px;
}

.phoneshow2 {
  width: 0px;
  height: 0px;
  border: 8px solid white;
  border-top: 8px solid rgba(192, 107, 103, 0.7);
  position: absolute;
  top: 170px;
  left: 320px;
}
</style>
