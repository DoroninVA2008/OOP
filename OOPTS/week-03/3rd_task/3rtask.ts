interface Book {
    title: string;
    author: string;
    year?: number;
}
const myLibrary: Book[] = [
    {title: "Муму", author: "Тургенев", year: 1852},
    {title: "Лев, Колдунья и платяной шкаф", author: "Дэвид Лоуренс"},
    {title: "Война и Мир", author: "Толстой", year: 1869}
];
function introduceYourself(name: string, age?: number): string {
    if (age) {
        return `Привет, меня зовут ${name} и мне ${age} лет.`;
    }
    else {
        return `Привет, меня зовут ${name}.`;
    }
};
console.log(introduceYourself('Петр', 30));
console.log(introduceYourself('Анна'));
console.log(myLibrary);