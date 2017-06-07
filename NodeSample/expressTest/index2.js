/**
 * Created by yangjie on 2017/5/11.
 */
var crypt = require('../utils/crypt.js');
var crypto = require('crypto');
console.log( crypt.encryptAes('123456', '123456'), crypt.decryptAes('f745b8abf736dc2b4e8db54b631a90e2', '123456') )

var sha1 = crypto.createHash('sha1');
sha1.update('foo');
sha1.update('bar');
console.log('foo + bar s sha1', sha1.digest('hex'));
var sha1 = crypto.createHash('sha1');
sha1.update('foobar');
console.log('foobar s sha1', sha1.digest('hex'));
