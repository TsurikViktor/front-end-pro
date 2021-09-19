'use strict'

Hamburger.SIZE_BIG = {//большой (100 тугриков, 40 калорий)
  price: 100,
  kCal: 40
};
Hamburger.SIZE_MIDLE = {//средний (75 тугриковб 30 каллорий)
  price: 75,
  kCal: 30
};
Hamburger.SIZE_SMALL = {//маленький (50 тугриков, 20 калорий)
  price: 50,
  kCal: 20
};
Hamburger.TOPPING_CHEESE = {//сыром (+ 10 тугриков, + 20 калорий)
  price: 10,
  kCal: 20
};
Hamburger.TOPPING_SALAD = {//салатом (+ 20 тугриков, + 5 калорий)
  price: 20,
  kCal: 5
};
Hamburger.TOPPING_POTATO = {//картофелем (+ 15 тугриков, + 10 калорий)
  price: 15, 
  kCal: 10
};
Hamburger.TOPPING_SPECIES = {//посыпать приправой (+ 15 тугриков, 0 калорий)
  price: 15,
  kCal: 0
};
Hamburger.TOPPING_MAYO = {//полить майонезом (+ 20 тугриков, + 5 калорий).
  price: 20,
  kCal: 5
};

function Hamburger(size) { 
  const price = size.price;
  const kCal = size.kCal;
  this.price = price;
  this.kCal = kCal;
  return 
};

Hamburger.prototype.addTopping = function(topping) {
  const price = this.price + topping.price;
  const kCal = this.kCal + topping.kCal;
  this.price = price;
  this.kCal = kCal;
  return
};

Hamburger.prototype.delTopping = function(topping) {
  const price = this.price - topping.price;
  const kCal = this.kCal - topping.kCal;
  this.price = price;
  this.kCal = kCal;
  return
};

Hamburger.prototype.getPrice = function() {
  const price = this.price;
  return price
};

Hamburger.prototype.getCallories = function() {
  const kCal = this.kCal;
  return kCal
};

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log("Price with sauce: " + hamburger.getPrice());
console.log("Callories with sauce: " + hamburger.getCallories());


/**Сеть фастфудов предлагает несколько видов гамбургеров:

Гамбургер может быть с одним из нескольких видов начинок:
При этом начинок можно добавить несколько или не быть совсем

Напишите программу, расчитывающую стоимость и калорийность гамбургера. Используй ООП подход
 (подсказка: нужен класс Гамбургер, статические константы, методы для выбора опций и расчета нужных величин).

Все константы дожны быть статическими свойствами функции конструктора.
Все методы нужно положить в прототип.

Пример работы кода:

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log("Price with sauce: “ + hamburger.getPrice());
console.log("Callories with sauce: “ + hamburger.getCallories());

Пример статического метода:
Hamburger.SIZE_SMALL = {
  price: 100,
  callories: 8888,
}
*/