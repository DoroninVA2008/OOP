var myLibrary = [
    { title: "Муму", author: "Тургенев", year: 1852 },
    { title: "Лев, Колдунья и платяной шкаф", author: "Дэвид Лоуренс" },
    { title: "Война и Мир", author: "Толстой", year: 1869 }
];
function introduceYourself(name, age) {
    if (age) {
        return "\u041F\u0440\u0438\u0432\u0435\u0442, \u043C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 ".concat(name, " \u0438 \u043C\u043D\u0435 ").concat(age, " \u043B\u0435\u0442.");
    }
    else {
        return "\u041F\u0440\u0438\u0432\u0435\u0442, \u043C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 ".concat(name, ".");
    }
}
;
console.log(introduceYourself('Петр', 30));
console.log(introduceYourself('Анна'));
console.log(myLibrary);
