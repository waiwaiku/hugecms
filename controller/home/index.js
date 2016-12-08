exports.name = 'index';
exports.index = function (req, res, next){
    res.send('moble'+':'+req.is_mobile+'<br />'+req.terminal_type);
};
