// function* generateFunction() {
//     yield 1
//     yield 2
//     yield 3
//     return 4
// }
// let generator = generateFunction();

// let one = generator.next();
// console.log(one)


// // 可迭代对象
// const range = {
//     from: 1,
//     to: 5,
//     [Symbol.iterator]() {
//         return {
//             current: this.from,
//             last: this.to,
//             next() {
//                 // 它应该以对象 {done:.., value :...} 的形式返回值
//                 if (this.current <= this.last) {
//                     return { done: false, value: this.current++ };
//                 } else {
//                     return { done: true };
//                 }
//             }
//         }
//     }
// }


// function* pseudoRandom(seed) {
//     let previous = seed
//     while (true) {
//         previous = previous * 16807 % 2147483647
//         yield previous
//     }
// }
// const a = pseudoRandom(1)
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())


// 异步迭代
let rangeA = {
    form: 1,
    to: 5,
    [Symbol.asyncIterator]() {
        return {
            current: this.form,
            last: this.to,
            async next() {
                await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        }
    }
}

for await (let value of rangeA) {
    console.log(value);
}
// async function processRange() {
//     try {
//         for await (let value of rangeA) {
//             console.log(value);
//         }
//     } catch (error) {
//         console.log(error)
//     }

// }

// processRange();








async function* fetchCommits(url) {
    let url = `https://api.github.com/repos/${url}/commits`
    while (url) {
        const response = await fetch(realUrl, {
            headers: { 'User-Agent': 'Our script' },
        })
        const body = await response.json();
        // (3) 前往下一页的 URL 在 header 中，提取它
        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
        nextPage = nextPage?.[1];

        url = nextPage;

        for (let commit of body) { // (4) 一个接一个地 yield commit，直到最后一页
            yield commit;
        }
    }
}








// node --experimental-top-level-await .\generate.js