var Controller = function(option) {
    this.name = 'sign';
    this._req = option.req;
    this._res = option.res;
    this._next = option.next;
    this._config = option.config;
};

Controller.prototype.index = function() {
    this._res.end('sign');
};

Controller.prototype.in = function() {
    this._res.send("login");
};

Controller.prototype.out = function() {
    this._res.send("logout");
};

Controller.prototype.verify = function() {
    var ccap = require("ccap");
    var captcha = ccap({
        width: 155,
        height: 50,
        offset: 30,
        quality: 100,
        fontsize: 40,
        strNum: 5,
        // generate: function() {
        //     //自定义生成字符串
        //     //此方法可不要
        //     var str = "qQ";
        //     return str;
        // }
    });
    var ary = captcha.get();
    console.log(ary[0]); //字符串
    this._res.end(ary[1]);
};

module.exports = Controller;
