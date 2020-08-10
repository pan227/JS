//AMD
//CMD
//CommonJS
//ES6 模块  https://stackoverflow.com/questions/35027046/difference-between-data-main-and-normal-script-loading#:~:text=data%2Dmain%20is%20for%20when,and%20kick%20off%20your%20app.
//defer 
//async
//https://flaviocopes.com/javascript-async-defer/

/**
 * data-main is for when you want to have a single entry point to your application. That single script line will load RequireJS along with scripts/main.js and kick off your app.

 * The result of

 * <script data-main="scripts/main" src="scripts/require.js"></script>
 * is that <script async src="scripts/main.js"></script> is appended to the document at runtime;
 * this is the script that will contain your require.config() block and pull in your first application script.
 * If you don't specify a data-main, then you're only loading Require and none of your app scripts,
 * unless you explicitly load a config file and the first module.
 */