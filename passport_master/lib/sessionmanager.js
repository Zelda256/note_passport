// SessionManager构造函数
function SessionManager(options, serializeUser) {
  if (typeof options == 'function') {
    serializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  this._key = options.key || 'passport';
  this._serializeUser = serializeUser;
}

// 主要工作：
// 1.在函数内部自定义一个序列化函数
// 2.将user保存到req._passport.session.user
// 3.将序列化结果保存到req.session['passport']
SessionManager.prototype.logIn = function(req, user, cb) {
  var self = this;
  //序列化user
  this._serializeUser(user, req, function(err, obj) {
    if (err) {
      return cb(err);
    }
    // 如果会话不存在
    if (!req._passport.session) {
      req._passport.session = {};
    }
    req._passport.session.user = obj;
    if (!req.session) {
      req.session = {};
    }
    // 将序列化结果保存到req.session['passport']
    req.session[self._key] = req._passport.session;
    cb();
  });
}

// 主要工作：
// 删除session中保存的user
SessionManager.prototype.logOut = function(req, cb) {
  if (req._passport && req._passport.session) {
    delete req._passport.session.user;
  }
  cb && cb();
}


module.exports = SessionManager;
