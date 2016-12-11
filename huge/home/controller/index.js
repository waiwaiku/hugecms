var _controller = require("../../controller");

module.exports = function(option) {
    var Controller = new _controller('index', option);
    Controller.register({
        index: function() {
            this.res.send('moble'+':' + this.req._isMobile + '<br />' + this.req._terminalType);
        }
    });

    return Controller.init();
};
