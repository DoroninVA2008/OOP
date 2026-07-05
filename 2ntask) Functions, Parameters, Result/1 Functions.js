// 1)
function fn() {};
const afn = () => {};
const fn1 = parametere => parametere;
const add = (a, b) => a + b;
function count() {
  return arguments.length === 0 ? 0 : (arguments.length === 3 ? 3 : arguments.length);
}