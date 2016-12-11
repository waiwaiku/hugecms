var _controller = require("../../../class/controller");

module.exports = function(option) {
    var Controller = new _controller('base', option);
    Controller.register({
        _initialize: function() {
            console.log(this.name);
            if(this.name === 'base') { // 禁止直接从base模块直接访问
                this.next();
            }else {
                if(this.req.query.user === 'kian') this.user = this.req.query.user;
                else this.res.redirect('/admin/sign/index');
            }
        }
    });

    return Controller.init();
};
