var Controller = function(option) {
    this.name = 'index';
    this._req = option.req;
    this._res = option.res;
    this._next = option.next;
    this._config = option.config;
};

Controller.prototype.index = function() {
    this._res.send('moble'+':' + this._req.isMobile + '<br />' + this._req.terminalType);
};

module.exports = Controller;
