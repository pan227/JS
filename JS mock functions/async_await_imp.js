// 简单来说，我们封装了一个run方法，run方法里我们把执行下一步的操作封装成_next()，每次Promise.then()的时候都去执行_next()
// 实现自动迭代的效果。在迭代的过程中，我们还把resolve的值传入gen.next()，使得yield得以返回Promise的resolve的值
// 链接：https://juejin.cn/post/6844904096525189128

// 这里插一句，是不是只有.then方法这样的形式才能完成我们自动执行的功能呢？答案是否定的，yield后边除了接Promise，还可以接thunk函数
// thunk函数不是一个新东西，所谓thunk函数，就是单参的只接受回调的函数，详细介绍可以看阮一峰Thunk 函数的含义和用法，无论是Promise还是thunk函数
// 其核心都是通过传入回调的方式来实现Generator的自动执行。thunk函数只作为一个拓展知识，理解有困难的同学也可以跳过这里，并不影响后续理解。
// https://juejin.cn/post/6844903683524657166

function run(gen) {
    //把返回值包装成promise
    return new Promise((resolve, reject) => {
      var g = gen()
  
      function _next(val) {
        //错误处理
        try {
          var res = g.next(val) 
        } catch(err) {
          return reject(err); 
        }
        if(res.done) {
          return resolve(res.value);
        }
        //res.value包装为promise，以兼容yield后面跟基本类型的情况
        Promise.resolve(res.value).then(
          val => {
            _next(val);
          }, 
          err => {
            //抛出错误
            g.throw(err)
          });
      }
      _next();
    });
  }


function _asyncToGenerator(fn) {
    // return一个function，和async保持一致。我们的run直接执行了Generator，其实是不太规范的
    return function() {
      var self = this
      var args = arguments
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);
  
        //相当于我们的_next()
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
        }
        //处理异常
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
        }
        _next(undefined);
      });
    };
  }
  
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  const foo = _asyncToGenerator(function* () {
    try {
      console.log(yield Promise.resolve(1))   //1
      console.log(yield 2)                    //2
      return '3'
    } catch (error) {
      console.log(error)
    }
  })
  
  foo().then(res => {
    console.log(res)                          //3
  })
  
  