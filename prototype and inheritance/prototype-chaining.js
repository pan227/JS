/**
 * 1.引用类型的属性被所有实例共享
 * 2.在创建 Child 的实例时，不能向Parent传参
 */

//Instance One
// function Parent() {
//     this.name = "kevin";
// }

// Parent.prototype.getName = function() {
//     console.log(this.name);
// }

// Parent.prototype.setName = function(name) {
//     this.name = name;
// }

// const parent = new Parent();

// function Child() {};

// Child.prototype = new Parent();

// const child1 = new Child();
// const child2 = new Child();

// parent.setName("Helen");
// console.log(child1.name);
// console.log(child2.name);

//Instance Two
function Parent() {
    this.names = ['kevin', 'daisy'];
}

function Child() {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names = ["kevin", "daisy", "nancy"];

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]