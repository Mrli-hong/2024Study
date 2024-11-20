function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) { // (1)
      return func.apply(this, args);
    } else {
      return function (...args2) { // (2)
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3))


const obj = {
  name: 'lhy',
  age: 18,
  sayHello(name, age) {
    console.log(this.name + name + age + this.age)
  }
}

function currying(fn, length) {
  // 第一次调用获取函数 fn 参数的长度，后续调用获取 fn 剩余参数的长度
  length = length || fn.length;
  // currying 包裹之后返回一个新函数，接收参数为 ...args
  return function (...args) {
    // 新函数接收的参数长度是否大于等于 fn 剩余参数需要接收的长度
    return args.length >= length
      ? fn.apply(this, args) // 满足要求，执行 fn 函数，传入新函数的参数
      : currying(fn.bind(this, ...args), length - args.length)
    // 不满足要求，递归 currying 函数，新的 fn 为 bind 返回的新函数
    //（bind 绑定了 ...args 参数，未执行），新的 length 为 fn 剩余参数的长度
  }
}

function curry(func) {
  return function curried(...args2) {
    const self = this
    if (args2.length >= func.length) {
      func.apply(this, args2)
    } else {
      return function (...args) {
        return curried.apply(self, args.concat(args2));
      }
    }
  }
}

obj.sayHello = curry(obj.sayHello)
obj.sayHello('lhy2')(90)