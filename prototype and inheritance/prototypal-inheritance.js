/**
 * 缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样
 */

// Object.create 的模拟实现
// function createObj(o) {
//     function F() {};
//     F.prototype = o;
//     return new F();
// }

var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]