<template>
  <div class="login">
      <h1>欢迎进入网易云音乐</h1>
      <div class="demo-input-suffix">
            <el-input placeholder="手机号 / 邮箱" class="aa" v-model="phone.phonenum" @blur="phoneyz()"></el-input>
            <div class="phoneshow1" v-if="phone.info">{{phone.title}}</div>
            <div class="phoneshow2" v-if="phone.info"></div>
            <el-input type="password" placeholder="密码" class="aa" v-model="pwd.password" @blur="pwdyz()"></el-input>
            <div class="phoneshow1" style="top:140px;" v-if="pwd.info">{{pwd.title}}</div>
            <div class="phoneshow2" style="top:180px;" v-if="pwd.info"></div>
            <el-button type="success" class="bb" @click="loginn()">登录</el-button>
            <router-link to="/registered" class="cc">注册网易</router-link>
            <a href="#" class="ff">忘记密码</a>
        </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: { info: false, title: "", condition: false, phonenum: "" },
      pwd: { info: false, title: "", condition: false, password: "" }
    };
  },
  methods: {
    phoneyz: function() {
      if (this.phone.phonenum == null || this.phone.phonenum == "") {
        this.phone.info = true;
        this.phone.title = "此项不能为空";
        this.phone.condition=false;
        return false;
      }

      if (
        /^1[34578]\d{9}$/.test(this.phone.phonenum) == false &&
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
        /^1[34578]\d{9}$/.test(this.phone.phonenum) == true ||
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/.test(
          this.phonenum
        ) == true
      ) {
        this.phone.info = false;
        this.phone.title = "";
        this.phone.condition = true;
      }
    },
    pwdyz: function() {
      if (this.pwd.password == null || this.pwd.password == "") {
        this.pwd.info = true;
        this.pwd.title = "此项不能为空";
        this.pwd.condition=false;
        return false;
      }
      this.pwd.info = false;
      this.pwd.title = "";
      this.pwd.condition = true;
    },
    loginn: function() {
      this.phoneyz();
      this.pwdyz();
      if (this.phone.condition == true && this.pwd.condition == true) {
        if (
          this.phone.phonenum == localStorage.getItem("phonenum") &&
          this.pwd.password == localStorage.getItem("password")
        ) {
          this.Login();
          this.$router.push("/");
        } else {
          this.open();
          this.phone.phonenum = "";
          this.pwd.password = "";
        }
      }
    },
    open() {
      this.$alert("帐号或者密码输入错误", "错误", {
        confirmButtonText: "重新输入"
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: auto;
  text-align: center;
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

a {
  display: inline-block;
  width: 100px;
  height: 20px;
  float: left;
  margin-top: 30px;
}

.cc {
  margin-left: calc((100% - 200px) / 2);
  color: rgb(66, 188, 87);
  border-right: 1px solid gray;
}

.ff {
  color: gray;
}

.phoneshow1 {
  width: 130px;
  height: 40px;
  background-color: rgba(192, 107, 103, 0.7);
  position: absolute;
  top: 90px;
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
  top: 130px;
  left: 320px;
}
</style>
