import { get } from 'lodash';
import { get as esGet } from 'lodash-es';
import dotget from 'lodash.get';
import slashGet from 'lodash/get';
import esSlashGet from 'lodash-es/get';

const testObj = { a: { b: 100 } };

function logError() {
  console.error('TEST_FAIL: ', msg);
}

function logPass(msg) {
  console.log('TEST_PASS: ', msg);
}

function test(fn, fnName) {
  if (fn === undefined) {
    return logError(`${fnName} is undefined`)
  }
  const r = fn(testObj, 'a.b');
  if (r === 100) {
    logPass(`${fnName} passed`)
  } else {
    logError(`${fnName} equal to ${r} expected 100`)
  }
}

// this is invoked by puppeteer
window.run = () => {
  test(get, 'get')
  test(esGet, 'esGet')
  test(dotget, 'dotget')
  test(slashGet, 'slashGet')
  test(esSlashGet, 'esSlashGet')
};
