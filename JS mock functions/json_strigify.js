/**
 *1.  if a value has a toJSON() method, it is responsible to define what data will be serialized
 *2.  Boolean, Number, String are converted to the corresponding primitive values
 *3. undefined, Functions, and Symbols are not valid JSON values. If any such values are 
 * encountered during conversion they are either omitted (when found in an object) or
 * changed to null (when found in an array). JSON.stringify() can return undefined when
 * passing in "pure" values like JSON.stringify(function(){}) or JSON.stringify(undefined).
 *4. All Symbol-keyed properties will be completely ignored, even when using the replacer function.
 *5. The instances of Date implement the toJSON() function by returning a string (the same as 
 * date.toISOString()). Thus, they are treated as strings.
 *6. The numbers Infinity and NaN, as well as the value null, are all considered null.
 *7. All the other Object instances (including Map, Set, WeakMap, and WeakSet) will have only 
 * their enumerable properties serialized.
 * **/




const getType = attr => {
    const type = Object.prototype.toString.call(attr);
    const newType = type.slice(8, type.length - 1);
    return newType;
}

window.JSON = {
    stringify: function(obj, replacer) {
        if (typeof obj !== "object" || getType(obj) === null) {
            return String(obj);
        }

        let json = [];
        let isArray = obj ? getType(obj) === "Array" : false;

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {

                let item = obj[key];
                let flag = true;
                if (replacer) {
                    switch (getType(replacer)) {
                        case "Function":
                            flag = replacer(key, item);
                            break;
                        case "Array":
                            flag = replacer.indexOf(key) !== -1;
                            break;
                    }
                }
                if (!flag) continue;

                if (item === obj) {
                    console.error(new TypeError("Converting circular structure to JSON"));
                    return false;
                }

                if (/Symbol|Function|Undefined/.test(getType(item))) {
                    delete obj[key];
                    continue;
                }

                if (getType(item) === "Object") {
                    item = JSON.stringify(item);
                }

                let isQueto = /Number|Boolean|Null/.test(getType(item)) ? "" : '"';

                //拼接数字段
                json.push((isArray ? isQueto : '"' + key + '": "') + String(item) + isQueto);
            }
        }
        console.log(arr, String(json));
        // 转换数字组字段为字符串
        return (isArray ? "[" : "{") + String(json) + (isArray ? "[" : "{");
    },

    parse: function(str) {
        return eval('(' + str + ')');
    }
}