var express = require("express");
var path = require("path");
var router = express.Router();


router.get(["/:C/:A\*", "/:C", "/"], action);
// router.post(["/:C/:A", "/:C", "/"], action);

function action(req, res, next) {
    var pathParam = (req.params[0] || '/').substring(1).split('/'); //获取路径参数
    if (pathParam[0] !== '') {
        for (var i = 0; i < pathParam.length; i += 2) {
            if (req.params[pathParam[i]] !== undefined || pathParam[i + 1] === undefined) continue;
            req.params[pathParam[i]] = pathParam[i + 1]; //将路径参数添加到params中
        }
    }

    console.log(req.query, req.params);

    //保存模块名称
    req.config.module_name = 'home';
    //保存控制器名称
    req.params.C = req.params.C || req.config.default_controller;
    //保存操作名称
    req.params.A = req.params.A || req.config.default_action;

    console.log([req.config.module_name, req.params.C]);

    try {
        var controller = require(path.join(req.config.root_path, req.config.controller_path, req.config.module_name, req.params.C + '.js'));
        if (controller.name === req.params.C)
            controller[req.params.A](req, res, next); //执行操作
    } catch (e) {
        //不存在路径或方法
        next();
    }

}
module.exports = router;
