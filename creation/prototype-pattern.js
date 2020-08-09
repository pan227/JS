/**
 * advantages: don't need to create methods every time
 * downside: Unlike the constructor pattern, can't initialize the instance and all instances share the same properties
 */

function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function() {
    console.log(this.name);
};

var person1 = new Person();

// optimization 1
/**
 * good: encapsulation is better
 * bad: lost constructor and initialization
 */

function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function() {
        console.log(this.name);
    }
};

var person1 = new Person();

// optimization 2
/**
 * good: has constructor function
 * 
 */

function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function() {
        console.log(this.name);
    }
};

var person1 = new Person();