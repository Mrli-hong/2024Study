class Clock {
    constructor({ template }) {
        this.template = template
    }
    render() {
        const date = new Date()
        let hour = date.getHours()
        if (hour < 10) hour = '0' + hour
        let min = date.getMinutes()
        if (min < 10) hour = '0' + hour
        let second = date.getSeconds()
        if (second < 10) hour = '0' + second
        let output = this.template
            .replace('h', hour)
            .replace('m', min)
            .replace('s', second)
        console.log(output)
    }
    stop() {
        clearInterval(this.timer)
    }
    start() {
        this.timer = setInterval(() => { this.render() }, 1000)
    }
}

// const clock = new Clock({ template: 'h:m:s' })
// setTimeout(() => {
//     console.log('start Stop')

//     clock.stop()
// }, 5000)
// clock.start()

module.exports = Clock