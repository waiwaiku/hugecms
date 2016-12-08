var path = require('path');

var config = {
    'default_controller': 'index', //默认控制器名称
    'default_action': 'index', //默认行为名称
    'default_view_theme': '0', //默认主题

    'statics_path': "public", //默认静态目录
    'controller_path': "controller"
};

config.common_css_path = path.join("public", 'common', 'css'); //静态文件css默认路径
config.common_js_path = path.join("public", 'common', 'js'); //静态文件js默认路径
config.common_images_path = path.join("public", 'common', 'images'); //静态文件images默认路径
config.common_images_path = path.join("public", 'common', 'fonts'); //静态文件fonts默认路径

module.exports = config;
