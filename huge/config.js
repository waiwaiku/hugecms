// var path = require('path');
var config = {
    'defaultModule': 'home', // 默认模块名
    'disableModule': [],

    'defaultController': 'index', //默认控制器名
    'defaultAction': 'index', //默认行为名
    'defaultViewTtheme': '0', //默认主题

    'staticsPath': "public", //默认静态目录
    'controllerPath': "controller"
};

// config.common_css_path = path.join("public", 'common', 'css'); //静态文件css默认路径
// config.common_js_path = path.join("public", 'common', 'js'); //静态文件js默认路径
// config.common_images_path = path.join("public", 'common', 'images'); //静态文件images默认路径
// config.common_images_path = path.join("public", 'common', 'fonts'); //静态文件fonts默认路径

module.exports = config;
