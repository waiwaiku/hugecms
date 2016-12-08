var path = require('path');
var root = path.join(__dirname, '../'),
    staticPath = '/statics';
module.exports = {
    'ROOT': root, //网站在服务器的绝对路径
    'DEFAULT_CONTROLLER_NAME': 'index', //默认控制器名称
    'DEFAULT_ACTION_NAME': 'index', //默认行为名称
    'SCRIPT_SUFFIX': '.js', //默认脚本后缀
    'URL_HTML_SUFFIX': '.html', //地址后缀
    'VIEW_THEME_NAME': '0', //默认主题
    'STATIC_PATH': staticPath, //默认静态文件路径
    //静态文件css默认路径
    'COMMON_CSS_PATH': path.join(staticPath, 'common', 'css'),
    //静态文件js默认路径
    'COMMON_JS_PATH': path.join(staticPath, 'common', 'js'),
    //静态文件images默认路径
    'COMMON_IMAGES_PATH': path.join(staticPath, 'common', 'images'),
    //静态文件fonts默认路径
    'COMMON_FONTS_PATH': path.join(staticPath, 'common', 'fonts')
};
