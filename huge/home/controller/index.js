var _controller = require("../../controller");

module.exports = function(option) {
    var Controller = new _controller('index', option);
    Controller.register({
        index: function() {
            this.res.send('<h1>HugeCMS</h1><p>welcome to hugecms</p><br />moble'+':' + this.req._isMobile + '<br />' + this.req._terminalType);
        }
    });

    return Controller.init();
};
