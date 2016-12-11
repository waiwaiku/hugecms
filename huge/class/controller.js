/*jshint esversion: 6 */
/**
 * [_controller description]
 * @param  {[type]} name    控制器名称
 * @param  {[type]} options 相关参数（至少包括req,res,next,config）
 * @param  {[type]} exfn    需要继承的控制器
 * @return {[type]}         [description]
 */
var _controller = function (name, options, exfn) {
    var Controller = function() {
        this.name = name;
        this.req = options.req;
        this.res = options.res;
        this.next = options.next;
        this.config = options.config;

        // 禁止base 模块加载操作
        if(this._initialize !== undefined && name !== 'base') this._initialize();
    };

    // 继承模块
    if(typeof exfn === 'function') {
        Controller.prototype = exfn(options);
        delete Controller.prototype.constructor;
    }

    this.register = function(obj) {
        for(let action in obj) {
            Controller.prototype[action] = obj[action];
        }
    };

    this.init = function() {
        return new Controller();
    };

    return this;
};


module.exports = _controller;
