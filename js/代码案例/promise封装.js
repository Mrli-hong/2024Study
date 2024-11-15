// Promise.allSettled polyfill
Promise.allSettled = function (promises) {
    const rejectHandler = reason => ({ status: 'rejected', reason });

    const resolveHandler = value => ({ status: 'fulfilled', value });

    return Promise.all(promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler)))
}

// 返回第一个成功的Promise如果全部失败返回一个特殊的AggregateError对象其中的errors是一个包含所有promise结果的对象
Promise.any()

// Promise.all(promises) —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 Promise.all 的 error，所有其他 promise 的结果都会被忽略。
// Promise.allSettled(promises)（ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：
// status: "fulfilled" 或 "rejected"
// value（如果 fulfilled）或 reason（如果 rejected）。
// Promise.race(promises) —— 等待第一个 settle 的 promise，并将其 result/error 作为结果返回。
// Promise.any(promises)（ES2021 新增方法）—— 等待第一个 fulfilled 的 promise，并将其结果作为结果返回。如果所有 promise 都 rejected，Promise.any 则会抛出 AggregateError 错误类型的 error 实例。
// Promise.resolve(value) —— 使用给定 value 创建一个 resolved 的 promise。
// Promise.reject(error) —— 使用给定 error 创建一个 rejected 的 promise。
function loadScriptPromise(src) {
    return new Promise((res, rej) => {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => res(script);
        script.onerror = () => rej(new Error(`Script load error for ${src}`));
        document.head.append(script);
    })
}