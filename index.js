module.exports = function (context, request, callback) {
  if (request.startsWith('lodash')) {
    if (request === 'lodash' || request === 'lodash-es') {
      return callback(null, '_');
    } else if (request[6] === '.' || request[9] === '.') {
      return callback(null, '_.' + request.split('.')[1]);
    } else if (request[6] === '/' || request[9] === '/') {
      return callback(null, '_.' + request.split('/')[1]);
    }
  }
  callback();
}
