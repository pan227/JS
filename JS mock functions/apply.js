/**
 * call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
 * 
 * 注意两点：
 * call 改变了 this 的指向，指向到 foo
 * bar 函数执行了
 * this 参数可以传 null，当为 null 的时候，视为指向 window
 * 函数是可以有返回值的！
 * 
 *将函数设为对象的属性
 *执行该函数
 *删除该函数
 */

Function.prototype.apply = function(context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, ['kevin', 18]));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }