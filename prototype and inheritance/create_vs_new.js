// the only difference is at step 3
// so basically object.create does not execute the constructo
function Test(a) {
    this.a = a;
}

//new Test()
function newObj(Test, a) {
    const obj = {};
    obj.__proto__ = Test.prototype;
    return Test.call(obj, a);
}

//Object.create()
function createObj(Test) {
    const obj = {};
    obj.__proto__ = Test.prototype;
    return Test.call(obj, a);
}