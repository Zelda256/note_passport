//passport程序入口

/**
 * Module dependencies.
 */
var Passport = require('./authenticator')
  , SessionStrategy = require('./strategies/session');


/**
 * Export default singleton.
 * 唯一默认出口
 * @api public
 */
exports = module.exports = new Passport();

/**
 * Expose constructors.
 */
exports.Passport =
exports.Authenticator = Passport;
exports.Strategy = require('passport-strategy');

/**
 * Expose strategies.
 */
exports.strategies = {};
exports.strategies.SessionStrategy = SessionStrategy;
