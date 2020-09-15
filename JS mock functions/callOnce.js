var logOnce = once(console.log);
logOnce("foo");
logOnce("bar"); // do nothing

var sum = (a, b) => console.log(a + b);
var sumOnce = once(sum);
sumOnce(1, 2);
sumOnce(2, 3); //do nothing
function once(fn) {
    var used = false;
    return function() {
        if (used !== true) {
            used = true;
            const args = Array.from(arguments);
            return fn.apply(null, args);
        }
    }
}