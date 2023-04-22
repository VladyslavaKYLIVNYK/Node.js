# Node.js

Hi!

PracticalTask2

Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді: 
console.log(add(2)(5)(7)(1)(6)(5)(11)());

Функція add() - приймає будь-яку кількість числових параметрів. Я вписала такі зачення console.log(add(2)(5)(7)(1)(6)(5)(11)(3)());// результат 40 

Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного. 

Функція Anagrams перевіряє, чи є два рядки анаграмами. Перетворила рядки на масиви символів, відсортувалося і порівняла ці рядки.

Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром. 

функція deepClone приймає об'єкт і повертає глибоку копію. 
Якщо переданий об'єкт є примітивом/undefined/null, то функція поверне об'єкт без змін. Якщо це об'єкт/масив, то функція створить новий об'єкт/масив.
Перебере всі ключі і скопіює їх значення в новий об'єкт/масив. 
Якщо значення ключа є об'єктом/масивом, то викличе функцію deepClone, щоб скопіювати глибоку копію значень. 
console.log () викликається двічі, один раз для виведення глибокої копії kopiObj, а другий раз, для перевірки, що змінні obj і kopiObj вказують на різні об'єкти в пам'яті.

Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів.

Цей код - це реалізація функції-обгортки, яка кешує результат будь-якої іншої функції з довільною кількістю числових параметрів.
функція-обгортка wrapper повертає нову функцію з кешуванням результату. 
Створюється об'єкт cach.
Повертаємо нову функцію (...args) => {} (приймає довільну кількість аргументів).
Визначаємо унікальний ключ для кешування результату за допомогою JSON.stringify(args).
Використовуємо умовний оператор if...else. Перевірка.
У кінці cach[key] - результат з кешу.
...

