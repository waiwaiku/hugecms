exports.name = 'index';
exports.index = function (req, res, next){
    res.send('moble'+':'+req.isMobile+'<br />'+req.CONFIG.TERMINAL_TYPE);
};
