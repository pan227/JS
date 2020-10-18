//An async function is a function declared with the async keyword. Async functions are instances of the AsyncFunction constructor, and the await keyword is permitted within them.
//The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.
//Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.
//Async functions can contain zero or more await expressions. Await expressions suspend progress through an async function, yielding control and subsequently resuming progress
//only when an awaited promise-based asynchronous operation is either fulfilled or rejected. The resolved
//value of the promise is treated as the return value of the await expression. Use of async / await enables the use of ordinary try / catch blocks around asynchronous code.

//The await operator is used to wait for a Promise. It can only be used inside an async function.

//Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.

async function foo() {
    return 1;
}
//equals to
function foo() {
    return Promise.resolve(1)
}

//The body of an async function can be thought of as being split by zero or more await expressions. Top-level code, up to and including 
//the first await expression (if there is one), is run synchronously. In this way, an async function without an await expression will run 
//synchronously. If there is an await expression inside the function body, however, the async function will always complete asynchronously.

//Code after each await expression can be thought of as existing in a .then callback. 
//In this way a promise chain is progressively constructed with each reentrant step through the function. 
//The return value forms the final link in the chain.

async function foo() {
    const a = await 1;
    return a;
}

//equal to
function foo() {
    return Promise.resolve(1).then((val) => val)
}


//async function and execution order
function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function() {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000)
    })
}

function resolveAfter1Second() {
    console.log("starting fast promise")
    return new Promise(resolve => {
        setTimeout(function() {
            resolve("fast")
            console.log("fast promise is done")
        }, 1000)
    })
}

//sequentail start
async function sequentialStart() {
    console.log('==SEQUENTIAL START==')

    // 1. Execution gets here almost instantly
    const slow = await resolveAfter2Seconds()
    console.log(slow) // 2. this runs 2 seconds after 1.

    const fast = await resolveAfter1Second()
    console.log(fast) // 3. this runs 3 seconds after 1.
}

//concurrent start
async function concurrentStart() {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds() // starts timer immediately
    const fast = resolveAfter1Second() // starts timer immediately

    // 1. Execution gets here almost instantly
    console.log(await slow) // 2. this runs 2 seconds after 1.
    console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

//concurrent start with promise.all
function concurrentPromise() {
    console.log('==CONCURRENT START with Promise.all==')
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
        console.log(messages[0]) // slow
        console.log(messages[1]) // fast
    })
}

//parallel start with promise.all

async function parallel() {
    console.log('==PARALLEL with await Promise.all==')

    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async() => console.log(await resolveAfter2Seconds()))(),
        (async() => console.log(await resolveAfter1Second()))()
    ])
}

// [rv] = await expression;
// expression : A Promise or any value to wait for.
// rv : Returns the fulfilled value of the promise, or the value itself if it's not a Promise.
// how to wrap setTimeout into promise
async function parent() {
    try {
        async function test() {
            return new Promise(resolve => {
                setTimeout(() => resolve("aaa"), 1000);
            })
        }
        const result = await test();
        console.log("result, ", result);
        console.log("bbbbb");
    } catch (err) {
        throw err;
    }
}





//rewrite a Promise chain with async function
function getProcessedData(url) {
    return downloadData(url) // returns a promise
        .catch(e => {
            return downloadFallbackData(url) // returns a promise
        })
        .then(v => {
            return processDataInWorker(v) // returns a promise
        })
}
//equals
async function getProcessedData(url) {
    let v
    try {
        v = await downloadData(url)
    } catch (e) {
        v = await downloadFallbackData(url)
    }
    return processDataInWorker(v)
}