var _controller = require("../../../class/controller");


module.exports = function(option) {
    var Controller = new _controller('index', option);
    Controller.register({
        index: function() {
            this.res.end('sign');
        },

        in: function() {
            this.res.send("login");
        },

        out: function() {
            this.res.send("logout");
        },

        verify: function() {
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
            this.res.end(ary[1]);
        }
    });
    return Controller.init();
};
