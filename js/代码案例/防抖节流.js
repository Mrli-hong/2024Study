// 防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}

// 节流函数
function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                timer = null;
            }, delay);
        }
    }
}
// 包装后绑定this，如果fn是对象方法的话,内部使用了this.xxx不使用apply绑定this，在调用fn()会报错
// const Worker = { method1:function () {this.xxx}}
// Worker.method1 = debounce(Worker.method1, 1000);
// 等同于 fn =  Worker.method1； fn()，在fn执行的时候没有this，所以需要apply绑定this