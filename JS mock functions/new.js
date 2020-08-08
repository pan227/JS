/**
 * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
 * new 可以访问到构造函数，也可以访问到构造函数的prototype
 * 因为new 是关键字，所以无法像bind 函数一样覆盖，所以我们写一个函数，命名为objectFactory, 来模仿new 的效果。
 */

//version 1
function objectFactory() {

    var obj = new Object(),

        Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    Constructor.apply(obj, arguments);

    return obj;

};

//当构造函数返回 object, 在实例对象中只能访问返回对象中的属性
//当构造函数返回一个基本类型，相当于没有返回值进行处理

function objectFactory() {

    var obj = new Object(),

        Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;

};