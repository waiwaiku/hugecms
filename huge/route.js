var express = require("express");
var path = require("path");
var router = express.Router();

router.all(["/:M/:C/:A/\*", "/:M/:C/:A", "/:M/:C", "/:M", "/"], function(req, res, next) {

    var config = {};
    try{
        Object.assign(config, req._config, require(path.join(req._config.appPath, req._module, 'config' )));
    }
    catch(e) {
        config = req._config;
    }

    req._module = req.params.M || config.defaultModule;
    req._controller = req.params.C || config.defaultController;
    req._action = req.params.A || config.defaultAction;

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

    console.log([req._module, req._controller, req._action]);

    try{
        var controller = require(path.join(req._config.appPath, req._module, 'controller', req._controller));
        var _controller = new controller({
            req: req,
            res: res,
            next: next,
            config: config
        });
        if(_controller[req._action] === undefined) next('route');
        else _controller[req._action](req.params);
    }
    catch(e) {
        next('route');
    }

    // res.json([req._module, req._controller, req._action, req.params]);
});

module.exports = router;
