/**
 * The major downside to constructors
 * is that methods are created once for each instance. So, in the previous example, both person1
 * and person2 have a method called sayName(), but those methods are not the same instance of
 * Function.
 */

function Person(name) {
    this.name = name;
    this.getName = function() {
        console.log(this.name);
    };
}

var person1 = new Person('kevin');


// optimization
/**
 * advantages: all instances share the same method
 * downside: it is not encapsulated well
 */

function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');