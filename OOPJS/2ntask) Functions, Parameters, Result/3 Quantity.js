//Для справки

    //Имя функции можно получить при помощи свойства name, например:

//function fn() {}

//console.log(fn.name) // => "fn"

    //Имя функции не всегда определено, т.к. функция могла быть создана без имени:

//function getName(fn) {
  //console.log(fn.name);
//}

//getName(function () {}) // => ''

    //Количество постоянных параметров функции можно получить при помощи свойства функции length

//function fna(a, b) {}
//console.log(fna.length) // => 2

// 3)
function describe(func) {
  const name = func.name || 'noname';
  const nums = func.length;
  return `${name}/${nums}`;
}

function add(a, b) {
  return a + b;
}

function sum() {
  let total = 0;
  return total;
}

function none() {}

const anonymfunction = function(a, b, c, d, e) {
  return a + b + c + d + e;
};