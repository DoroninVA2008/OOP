//Для справки

//Получить доступ к массиву аргументов функции можно двумя способами. Первый способ:

// Функция fn1 выведет все аргументы функции
//function fn1() {
  //for (const arg of arguments) {
    //console.log(arg);
  //}
//}

//Второй способ появился с новым синтаксисом:

// Функция fn2 выведет все аргументы функции
//function fn2(...args) {
  //for (const arg of args) {
    //console.log(arg);
  //}
//}

// 2) Для справки
function sum () {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  };
  return total;
};