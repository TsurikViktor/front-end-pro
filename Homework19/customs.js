'use strict'
//Задача №1


class Group {
  students = [];
  constructor(student) {
   
   console.log(students)
  }
}
Group.prototype.addStudent = function(student){
    students.push(student);
    return students
}
class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;

  }  
  //get name() {
  //  return this._name;
  //}
//
  //set name(value) {
  //  if (value.length < 1) {
  //    alert("Имя слишком короткое.");
  //    return;
  //  }
  //  this._name = value;
  //}
}


const student = new Student()
const group = new Group();

console.log(new Student('John', [10, 8]));
//group.addStudent({});


group.addStudent(new Student('John', [10, 8]));
//group.addStudent(new Student('Alex', [10, 9]));
//group.addStudent(new Student('Bob', [6, 10,]));
//console.log(students)
console.log(group)



/*/ При добавлении валидировать тип добавляемого объекта
// и если тип не Student - игнорировать
// функцию валидатор сделать приватной
console.log(group.students.length === 3);
group.addStudent({});
console.log(group.students.length === 3);

// Выводим средний балл группы
console.log(group.getAverageMark() === (10 + 8 + 10 + 9 + 6 + 10) / 6); // 8.83

// Сделать group.students - readonly
group.students = [new Student('John', [10, 10, 5, 10])];
console.log(group.students.length === 3);*/

//Задача №2

Array.prototype.max = function(){
  let max = this[0];

  for(let i = 1; i < this.length-1; ++i){
    if (Array.isArray(this[i])) {
      this[i]=this[i].max();
    };
    if (isNaN(this[i])) {
      this[i] = 0;
    };   
    if(this[i] > max){
      max = this[i];
    };
  };
  return max;
};


[6, 5, 8, 7, 456, -6].max();//456
[-1,[77,999, 'kgjk'], 5,[-211,[77,1000,[-661,[77,11011, 'kgjk'], 99, 78], 'kgjk'], 6, 5], 8, 99, 78].max(); // 11011 
