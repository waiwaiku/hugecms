var express = require("express");
var path = require("path");
var fs = require("fs");
var router = express.Router();
var CONFIG = require("../config/admin");
// router.get(/^(\/(\w+))+$/, function(req, res, next){
//     res.send('kian');
//     console.log(req.params);
// });

var action = function(req, res, next) {
    var pathParam = (req.params[0] || '/').substring(1).split('/'); //获取路径参数
    if (pathParam[0] !== '') {
        for (var i = 0; i < pathParam.length; i += 2) {
            if (req.query[pathParam[i]] !== undefined || pathParam[i + 1] === undefined) continue;
            req.query[pathParam[i]] = pathParam[i + 1]; //将路径参数添加到query参数中
        }
    }

    //保存模块名称
    CONFIG.MODULE_NAME = 'admin';
    //保存控制器名称
    CONFIG.CONTROLLER_NAME = req.params.C || CONFIG.DEFAULT_CONTROLLER_NAME;
    //保存操作名称
    CONFIG.ACTION_NAME = req.params.A || CONFIG.DEFAULT_ACTION_NAME;
    //模板路径----模块/主题/控制器/操作
    CONFIG.VIEW_ACTION_PATH = path.join(CONFIG.MODULE_NAME, CONFIG.VIEW_THEME_NAME, CONFIG.CONTROLLER_NAME, CONFIG.ACTION_NAME);
    //静态文件路径----静态路径/模块/主题/文件类型
    CONFIG.STATIC_CSS_PATH = path.join(CONFIG.STATIC_PATH, CONFIG.MODULE_NAME, CONFIG.VIEW_THEME_NAME, 'css');
    CONFIG.STATIC_JS_PATH = path.join(CONFIG.STATIC_PATH, CONFIG.MODULE_NAME, CONFIG.VIEW_THEME_NAME, 'js');
    CONFIG.STATIC_IMAGES_PATH = path.join(CONFIG.STATIC_PATH, CONFIG.MODULE_NAME, CONFIG.VIEW_THEME_NAME, 'images');
    CONFIG.STATIC_FONTS_PATH = path.join(CONFIG.STATIC_PATH, CONFIG.MODULE_NAME, CONFIG.VIEW_THEME_NAME, 'fonts');

    //保存配置
    req.CONFIG = CONFIG;

    try {
        var controller = require(path.join('../controller', CONFIG.MODULE_NAME, CONFIG.CONTROLLER_NAME + '.js'));
        if (controller.name === CONFIG.CONTROLLER_NAME)
            controller[CONFIG.ACTION_NAME](req, res, next); //执行操作
    } catch (e) {
        //不存在路径或方法
        next();
    }
};

router.get(["/:C/:A" + CONFIG.URL_HTML_SUFFIX + "\*", "/:C" + CONFIG.URL_HTML_SUFFIX, "/"], action);
router.post(["/:C/:A" + CONFIG.URL_HTML_SUFFIX + "\*", "/:C" + CONFIG.URL_HTML_SUFFIX, "/"], action);

module.exports = router;
