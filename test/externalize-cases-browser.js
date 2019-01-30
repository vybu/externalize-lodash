import { get } from 'lodash';
import { get as esGet } from 'lodash-es';
import dotget from 'lodash.get';
import slashGet from 'lodash/get';
import esSlashGet from 'lodash-es/get';
import isempty from 'lodash.isempty';

const testObj = { a: { b: 100 } };

function logError(msg) {
  console.error('TEST_FAIL: ', msg);
}

function logPass(msg) {
  console.log('TEST_PASS: ', msg);
}

function testGet(fn, fnName) {
  if (fn === undefined) {
    return logError(`${fnName} is undefined`);
  }
  const r = fn(testObj, 'a.b');
  if (r === 100) {
    logPass(`${fnName} passed`);
  } else {
    logError(`${fnName} equal to ${r} expected 100`);
  }
}

function testIsEmpty(fn, fnName) {
  if (fn === undefined) {
    return logError(`${fnName} is undefined`);
  }
  const r = fn(testObj);
  if (r === false) {
    logPass(`${fnName} passed`);
  } else {
    logError(`${fnName} equal to ${r} expected false`);
  }
}

// this is invoked by puppeteer
window.run = () => {
  testGet(get, 'get');
  testGet(esGet, 'esGet');
  testGet(dotget, 'dotget');
  testGet(slashGet, 'slashGet');
  testGet(esSlashGet, 'esSlashGet');
  testIsEmpty(isempty, 'isempty');
};
