exports.install = function (Vue, options) {
    const arr=[];
    isLogin=false;
    Vue.prototype.Buy = function (val){
        this.isLogin();
        arr.push(val);
    };

    Vue.prototype.getBuy=function () {
        this.isLogin();
        return arr;
    };

    Vue.prototype.delete=function (index) {
        arr.splice(index,1);
        return arr;
    };

    Vue.prototype.isLogin=function () {
        if(isLogin==false){
            this.$router.push("/login");
            return false;
        }
    };

    Vue.prototype.Login=function () {
        isLogin=true;
    };

    Vue.prototype.unLogin=function () {
        isLogin=false;
    };
};