/*jshint esversion: 6 */
var _controller = function (name, options) {
    var Controller = function() {
        var self = this;
        this.name = name;
        this.req = options.req;
        this.res = options.res;
        this.next = options.next;
        this.config = options.config;
    };

    this.register = function(obj) {
        for(let action in obj) {
            Controller.prototype[action] = obj[action];
        }
    };

    this.init = function() {
        return new Controller();
    };
};


module.exports = _controller;
