/**
 * The function can be called any number of times
 * with different arguments and will still return an object that has three properties and one method.
 * Though this solved the problem of creating multiple similar objects
 * The factory parttern did not address the issue of object identification(what type of object an object is
 *  */

function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function() {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');