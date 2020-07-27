//原型继承
//类A
function ClassA(a, b) {
    this.a = a;
    this.b = b;
}
ClassA.prototype = {
    constructor: ClassA,
    getA: function() {
        return this.a
    },
    getB: function() {
        return this.b
    }
}

//类B
function ClassB(c) {
    this.c = c;
}
//继承的关键
ClassB.prototype = new ClassA();

console.log(ClassB.prototype.constructor === ClassA); //这里会输出true
//所以要修正构造函数

ClassB.prototype.constructor = ClassB;

ClassB.prototype.getC = function() {
    return this.c
}

var a = new ClassA(2, 3);
console.log(a.getA(), a.getB());

var b = new ClassB(6);
console.log(b.getA(), b.getB(), b.getC())


//版权声明： 本文为CSDN博主「 sundial dreams」 的原创文章， 遵循CC 4.0 BY - SA版权协议， 转载请附上原文出处链接及本声明。
//原文链接： https: //blog.csdn.net/daydream13580130043/java/article/details/83830420