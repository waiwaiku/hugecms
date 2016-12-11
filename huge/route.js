/*jshint esversion: 6 */
var express = require("express");
var path = require("path");
var fs = require("fs");
var router = express.Router();

router.all(["/:M/:C/:A/\*", "/:M/:C/:A", "/:M/:C", "/:M", "/"], (req, res, next) => {
    req._module = req.params.M || req._config.defaultModule;
    req._controller = req.params.C || req._config.defaultController;
    req._action = req.params.A || req._config.defaultAction;

    // 判断请求模块是否存在
    if (req._allowModules[req._module] === undefined) {
        // 若不存在， 则设置默认模块为当前模块， 并重构params[0] 值
        req._action = req._controller;
        req._controller = req._module;
        req._module = req._config.defaultModule;

        // console.log(req.params);
        if(req.params.A) {
            req.params[0] = req.params[0] === undefined ? req.params.A : req.params.A + '/' + req.params[0];
        }
    }

    // console.log(config);
    // console.log(req.params);
    // console.log(req._allowModules[req._module]);

    // 解析路径键/值对参数
    if(req.params[0]) {
        var pathParam = req.params[0].split(path.sep);
        if (pathParam[0] !== '') {
            for (var i = 0; i < pathParam.length; i += 2) {
                if (req.params[pathParam[i]]) {
                    next();
                    return;
                }
                req.params[pathParam[i]] = pathParam[i + 1] || null; //将路径参数添加到params中
            }
        }
    }

    // console.log([req._module, req._controller, req._action]);

    var _controller = req._allowModules[req._module].controller[req._controller];
    if (_controller === undefined) {
        next();
    } else {
        var config = {};
        try{
            // 合并配置文件
            Object.assign(config, req._config, require(`./modules/${req._module}/config`));
        }
        catch(e) {
            config = req._config;
        }

        try{
            let options = {
                config: config,
                req: req,
                res: res,
                next: next
            };
            // let Controller = require(`./modules/${req._module}/controller/${req._controller}`)(options);
            let Controller = _controller(options);

            console.log(Controller.hasOwnProperty(req._action));

            // 过滤初始对象属性 以及 未知操作,防止恶意攻击
            if(Controller[req._action] === undefined || options[req._action] !== undefined) next();
            else Controller[req._action](req.params);
        }
        catch(e) {
            next();
        } // try catch
    } // if else
});

module.exports = router;
