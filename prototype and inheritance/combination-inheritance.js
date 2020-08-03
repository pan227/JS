/**
 * combination of prototype chaining and constructor stealing
 * the most common method
 */

function Parent(name) {
    this.name = name;
    this.colors = ["red", "blue"];
}

Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();

Child.prototype.constructor = Child;

const child1 = new Child("kevin", 18);
child1.colors.push("green");
console.log(child1.name);
console.log(child1.age);
console.log(child1.colors);

const child2 = new Child("Lily", 33);
child2.colors.push("black");
console.log(child2.name);
console.log(child2.age);
console.log(child2.colors);