// only to update instance prototype
// we should only update __proto__, can't touch the Test.prototype
function Test() {
    this.a = 1;
    this.b = 2;
    this.c = 3;
}

Test.prototype = {
    constructor: Test,
    getA: function() { return this.a }
}

const test = new Test();
console.log(test.__proto__) // {constructor: ..., getA: ...}
test.__proto__.constructor.prototype === Test.prototype; // true
Test.prototype.getB = function() { return this.b };
console.log(test.__proto__); // {constructor: ..., getA: ..., getB: ...}
test.__proto__.getC = function() { return this.c };
console.log(test);
console.log(test.__proto__);