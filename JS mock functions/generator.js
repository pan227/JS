// 生成器函数根据yield语句将代码分割为switch-case块，后续通过切换_context.prev和_context.next来分别执行各个case
// 从中我们可以看出，Generator实现的核心在于上下文的保存，函数并没有真的被挂起，每一次yield，其实都执行了一遍传入的生成器函数，
// 只是在这个过程中间用了一个context对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样
// generator 可以和 async/await 混用， generator 本质是 iterator， async/await generator 语法糖，用promise 包装了，自动执行。 async 可以看作 *, await 可以看作 yield

function gen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';
  
        case 2:
          _context.next = 4;
          return 'result2';
  
        case 4:
          _context.next = 6;
          return 'result3';
  
        case 6:
        case "end":
          return _context.stop();
      }
    }
  }
  
  // 低配版context  
  var context = {
    next:0,
    prev: 0,
    done: false,
    stop: function stop () {
      this.done = true
    }
  }
  
  // 低配版invoke
  let gen = function() {
    return {
      next: function() {
        value = context.done ? undefined: gen$(context)
        done = context.done
        return {
          value,
          done
        }
      }
    }
  } 
  
  // 测试使用
  var g = gen() 
  g.next()  // {value: "result1", done: false}
  g.next()  // {value: "result2", done: false}
  g.next()  // {value: "result3", done: false}
  g.next()  // {value: undefined, done: true}

//   链接：https://juejin.cn/post/6844904096525189128
//   来源：掘金
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。