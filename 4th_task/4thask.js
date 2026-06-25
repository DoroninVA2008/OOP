// Часть A (Дженерики):
function toArray() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
}
var numbers = toArray(1, 2, 3, 4, 5);
var strings = toArray("Hello", "Vite", "+", "React", "+", "TypeScript", "!");
console.log(numbers);
console.log(strings);
function parseInput(input, radix) {
    if (radix) {
        return parseInt(input, radix);
    }
    else {
        return parseInt(input, 10);
    }
}
;
var xmpl1 = parseInput("7");
console.log(xmpl1);
