module.exports = function (context, request, callback) {
  if (request.startsWith('lodash')) {
    // covers import/require 'lodash' and import 'lodash-es'
    if (request === 'lodash' || request === 'lodash-es') {
      return callback(null, '_');
    // covers import/require from 'lodash.get' and other methods
    } else if (request[6] === '.') {
      return callback(null, '_.' + request.split('.')[1]);
    // covers import/require 'lodash/get' and import 'lodash-es/get'
    } else if (request[6] === '/' || request[9] === '/') {
      return callback(null, '_.' + request.split('/')[1]);
    }
  }
  callback();
}
