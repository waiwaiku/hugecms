var _controller = require("../../controller");

module.exports = function(option) {
    var Controller = new _controller('index', option);
    Controller.register({
        index: function() {
            this.res.end('hello kian!');
        }
    });

    return Controller.init();
};
