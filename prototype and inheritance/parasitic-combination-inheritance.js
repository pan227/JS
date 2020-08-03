/**
 * reference to combination-inheritance.js
 * 组合继承最大的缺点是会调用两次父构造函数。

 *一次是设置子类型实例的原型的时候：

 *Child.prototype = new Parent();
 *一次在创建子类型实例的时候：

 *var child1 = new Child('kevin', '18');
 *回想下 new 的模拟实现，其实在这句中，我们会执行：

 *Parent.call(this, name);
 *在这里，我们又会调用了一次 Parent 构造函数。

 *所以，在这个例子中，如果我们打印 child1 对象，我们会发现 Child.prototype 和 child1 都有一个属性为colors，属性值为['red', 'blue', 'green']。

 *那么我们该如何精益求精，避免这一次重复调用呢？

 *如果我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 呢？
 */

// 下面展示 

// function Parent(name) {
//     this.name = name;
//     this.colors = ["red", "blue"];
// }

// Parent.prototype.getName = function() {
//     console.log(this.name);
// }

// function Child(name, age) {
//     Parent.call(this, name);
//     this.age = age;
// }

// function F() {};
// F.prototype = Parent.prototype;
// Child.prototype = new F();

// var child1 = new Child("lily", 18);

//封装一下这个方法
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    const prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

//当我使用的时候
prototype(Child, Parent);

/**
 * 这种方式的高效率体现它只调用了一次 Parent 构造函数，
 * 并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
 * 与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
 * 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
 */