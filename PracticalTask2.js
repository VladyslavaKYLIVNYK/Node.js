
//Задача 1
function add(args) {
    let n = args;

    function add2(a) {
        if (a === undefined) {
            return n;
        } else if (a !== undefined) {
            n = n + a;
            return add2
        }
    }
    return add2
}
//console.log(add(2)(5)(7)(1)(6)(5)(11)(3)());
//Задача 2
let anagram1 = "Code";
let anagram2 = "Edco";
function Anagrams(word1, word2) {

    let anagram1 = word1.toLowerCase().split('').sort().join('');
    let anagram2 = word2.toLowerCase().split('').sort().join('');

    if (anagram1 === anagram2) {
        return true
    } else {
        return false
    }
}
console.log(Anagrams(anagram1, anagram2));
//Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.
function deepClone(obj) {
    if (typeof obj !== "object" || obj === undefined || obj === null) {
        return obj;
    }
    const kopi = Array.isArray(obj) ? [] : {};

    for (const key of Object.keys(obj)) {
        kopi[key] = deepClone(obj[key]);
    }

    return kopi;
}

let obj = {
    a: 13,
    n: {
        c: 3,
        d: 4,
    },
    m: [13, 3, 4],
};
const kopiObj = deepClone(obj);
console.log(kopiObj);
console.log(obj == kopiObj);
//Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів
const wrapper = (func) => {
    const cach = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (cach[key] === 0 || cach[key] === undefined) {
            cach[key] = func(...args);
            console.log(`${cach[key]} `);
        } else {
            console.log(`${cach[key]} cache`);
        }
        return cach[key];
    };
};
console.log(add(2)(5)(7)(1)(6)(5)(11)(3)());

const adds = (a, b, c) => a + b + c;
const cachedCalc = wrapper(adds);

cachedCalc(2, 2, 3); //  7
cachedCalc(5, 8, 1); //  14
cachedCalc(2, 2, 3); //7