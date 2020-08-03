/**
 * 优点：
 * 1.避免了引用类型的属性被所有实例共享
 * 2.可以在Child 中向parent 传参
 * 缺点：
 * 方法都在构造函数中定义，每次创建实例都会创建一遍方法
 */
// function Parent() {
//     this.names = ["kevin", "Daisy"];
// }

// function Child() {
//     Parent.call(this);
// }

// const child1 = new Child();
// child1.names.push("Helen");
// console.log(child1.names);

// const child2 = new Child();
// console.log(child2.names);

function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy