exports.name = 'sign';
exports.index = function(req, res, next) {
    console.log(req.query);
    res.render(req.CONFIG.VIEW_ACTION_PATH, {
        'CONFIG': req.CONFIG,
        'TITLE': 'VSU.CC后台登录'
    });
};

exports.in = function(req, res, next) {
    res.send("login");
};

exports.out = function(req, res, next) {
    res.send("logout");
};

exports.verify = function(req, res, next) {
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
    res.end(ary[1]);
};
