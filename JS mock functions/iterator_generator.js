//function* genrator(i) {yield i; yield i + 10;}
//The function* declaration (function keyword followed by an asterisk) defines a generator function, which returns a Generator object.
//The Generator object is returned by a generator function, cannot be instantiated directly. It conforms to both the iterable protocol and the iterator protocol.
//The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a for...of construct.
//Some built-in types are built-in iterables with a default iteration behavior, such as Array or Map, while other types (such as Object) are not.
//In order to be iterable, an object must implement the @@iterator method, meaning that the object
//(or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant [Symbol.iterator]
//The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite),
//and potentially a return value when all values have been generated.
//An object is an iterator when it implements a next() method with the following semantics: that returns an object with at least the following two properties:
//{done: boolean, value: any type. can be omitted when done is true}

//the following satisfies both the Iterator and Iterable

let myIterator = {
    next: function() {
        // ...
        //return {done: boolean, value: any type. can be omitted when done is true}
    },
    [Symbol.iterator]: function() { return this; }
};

//iterator

function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
        next: function() {
            let result;
            if (nextIndex < end) {
                result = { value: nextIndex, done: false }
                nextIndex += step;
                iterationCount++;
                return result;
            }
            return { value: iterationCount, done: true }
        }
    };
    return rangeIterator;
}

//generator
//The yield keyword is used to pause and resume a generator function

function* infinite() {
    let index = 0;

    while (true) {
        yield index++;
    }
}

const generator = infinite(); // "Generator { }"

console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2