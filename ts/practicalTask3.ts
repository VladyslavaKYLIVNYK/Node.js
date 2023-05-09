
//1
function add(args: number): Function {
    let n: number = args;
    function add2(a?: number): Function | number {
        if (a === undefined) {
            return n;
        } else {
            n = n + a;
            return add2;
        }
    }
    return add2;
}
console.log(add(2)(5)(7)(1)(6)(5)(11)(3)());

//2

let anagram1: string = "Code";
let anagram2: string = "Edco";

function Anagrams(word1: string, word2: string): boolean {

    let anagram1: string = word1.toLowerCase().split('').sort().join('');
    let anagram2: string = word2.toLowerCase().split('').sort().join('');

    if (anagram1 === anagram2) {
        return true
    } else {
        return false
    }
}
console.log(Anagrams(anagram1, anagram2));

//3
function deepClone(obj: { [key: string]: any }) {
    if (typeof obj !== "object" || obj === undefined || obj === null) {
        return obj;
    }

    const kopi: { [key: string]: any } = Array.isArray(obj) ? [] : {};


    for (const key of Object.keys(obj)) {
        kopi[key] = deepClone(obj[key]);
    }

    return kopi;
}

const obJ = {
    a: 13,
    n: {
        c: 3,
        d: 4,
    },
    m: [13, 3, 4],
};

const kopiObj = deepClone(obJ);
console.log(kopiObj);
console.log(obJ === kopiObj);

//4

const wrapper = (func: Function) => {
    let cach = {};
    return (...args: unknown[]) => {
        const key = JSON.stringify(args);
        const cach: { [key: string]: number } = {};

        if (cach[key] === 0 || cach[key] === undefined) {
            cach[key] = func(...args);
            console.log(`${cach[key]} `);
        } else {
            console.log(`${cach[key]} cache`);
        }
        return cach[key];
    };
};

console.log(wrapper((a: number, b: number, c: number) => a + b + c)(2, 5, 7));

const adds = (a: number, b: number, c: number) => a + b + c;
const cachedCalc = wrapper(adds);

cachedCalc(2, 2, 3); // 7
cachedCalc(5, 8, 1); // 14
cachedCalc(2, 2, 3); // 7


