'use strict'
/**
 * Калькулятор на ООП
 *
 * Создать функцию конструктор которая 
 * принимает базовое знаячение и возвращает
 * объект с набором методов которые могут 
 * прибавлять, вычитать, устанавливать новое
 * базовое знаячение и возвращать значение.
 *
 * Если вместо числа передается что-то другое, например строка
 * - возвращать NaN и ничего не делать
 */

function Calculator(base) {
  this.base = base;
  this.add = function add(newVal) {
    if (isNaN(newVal)) {
      return  NaN 
    }
    return this.base += newVal 
  };
  this.sub = function sub(newVal) {
    if (isNaN(newVal)) {
      return  NaN
    }
    return this.base -= newVal
  }; 
  this.set = function set(newVal) {
    if (isNaN(newVal)) {
      return  NaN
    }
    return this.base = newVal
  };
  this.get = function get() {
    return this.base
  };
};
  
const calc = new Calculator(100);
  
calc.add(10); // 110 возвращает (в консоль ничего выводить не нужно)
calc.add(10); // 120 возвращает (в консоль ничего выводить не нужно)
calc.sub(20); // 100 возвращает (в консоль ничего выводить не нужно)
calc.set(20); // 20
calc.add(10); // 30
calc.add('qwe'); // NaN и значение 40 не менять
calc.get(); // 30 calc.base
calc.base // результат последней операции