const test = require('ava');

const {Pen} = require('../dist/index.js');

test('pen should return correct color', t => {
  const text = 'This should be red';
  t.is(Pen(text, 'red'), `\x1b[38;2;255;0;0m${text}\x1b[0m`);
});

test('pen should return correct hex color', t => {
  const text = 'This should be red';
  t.is(Pen(text, '#FF0000'), `\x1b[38;2;255;0;0m${text}\x1b[0m`);
});

test('pen should return correct rgb color', t => {
  const text = 'This should be red';
  t.is(Pen(text, {r: 255, b: 0, g: 0}), `\x1b[38;2;255;0;0m${text}\x1b[0m`);
});

test('pen should return correct color object', t => {
  const text = 'This should be red';
  t.is(Pen(text, {c: 'red'}), `\x1b[38;2;255;0;0m${text}\x1b[0m`);
});

test('pen should return correct background color', t => {
  const text = 'This should be red in background';
  t.is(Pen(text, {b: 'red'}), `\x1b[48;2;255;0;0m${text}\x1b[0m`);
});

test('pen should return correct other options', t => {
  const text = 'This should be bold and underline';
  t.is(Pen(text, {o: 'bu'}), `\x1b[4;1m${text}\x1b[0m`);
});

test('pen should return all test value', t => {
  const text = 'This should have all value';
  t.is(
    Pen(text, {c: 'red', b: 'red', o: 'bu'}),
    `\x1b[38;2;255;0;0;48;2;255;0;0;4;1m${text}\x1b[0m`
  );
});
