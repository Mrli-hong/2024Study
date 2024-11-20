// new Proxy(target, handler)

// Object.getOwnPropertyNames(obj) 返回非 symbol 键。
// Object.getOwnPropertySymbols(obj) 返回 symbol 键。
// Object.keys/values() 返回带有 enumerable 标志的非 symbol 键/值（属性标志在 属性标志和属性描述符 一章有详细讲解)。
// for..in 循环遍历所有带有 enumerable 标志的非 symbol 键，以及原型对象的键。

let user = {
    name: "John"
  };
  
  function wrap(target) {
    return new Proxy(target, {
        get(t,prop,receiver){
            if(Object.keys(target).includes(prop)){
                return Reflect.get(t,prop,receiver)
            }else{
                console.log(`Property doesn't exist: ${prop}`);
            }
        }
    });
  }
  
  user = wrap(user);
  
  console.log(user.name); // John
  console.log(user.age); // ReferenceError: Property doesn't exist: "age"