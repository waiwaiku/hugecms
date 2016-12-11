var _controller = require("../../../class/controller");
var base = require('./base');

module.exports = function(option) {
    var Controller = new _controller('index', option, base);
    Controller.register({
        index: function() {
            this.res.end(this.user);
        }
    });

    return Controller.init();
};
