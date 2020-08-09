function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function() {
        console.log(this.name);
    }
};

var person1 = new Person();

//if we encapsulate together
//不能用对象字面量重写原型
/**
 * 
 * 我们回顾下 new 的实现步骤：

 * 首先新建一个对象
 * 然后将对象的原型指向 Person.prototype
 * 然后 Person.apply(obj)
 * 返回这个对象
 * 注意这个时候，回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意构造函数的 prototype 属性指向了实例的原型，使用字面量方式直接覆盖 Person.prototype，
 * 并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！
 */

function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function() {
                console.log(this.name);
            }
        }
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();

// the good way to encapsulate 
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function() {
                console.log(this.name);
            }
        }

        return new Person(name);
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

person1.getName(); // kevin
person2.getName(); // daisy