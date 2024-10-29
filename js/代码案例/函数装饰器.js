// function spy(fn) {
//     function wrapper() {
//         wrapper.calls.push([].join.apply(arguments))
//         fn.apply(this, arguments)
//     }
//     wrapper.calls = [];
//     return wrapper
// }


// function work(a, b) {
//     console.log(a + b); // work 是一个任意的函数或方法
// }

// work = spy(work);

// work(1, 2); // 3
// work(4, 5); // 9

// for (let args of work.calls) {
//     console.log('call:' + args); // "call:1,2", "call:4,5"
// }



function wrapper(fn) {
    // return () => {
    //     console.log('wrapper');
    //     // fn.apply(this, arguments) undefined
    //     // fn() undefined
    // }
    return function () {
        console.log('wrapper');
        fn.apply(this)
    }
}

const worker = {
    name: 'lhy',
    work: function () {
        console.log('worker', this.name)
    }
}

worker.work = wrapper(worker.work)
worker.work()