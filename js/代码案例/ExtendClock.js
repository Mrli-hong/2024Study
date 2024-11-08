const Clock = require('./Clock')


class ExtendedClock extends Clock {
    constructor({ template, precision = 1000 }) {
        super({ template })
        this.precision = precision
    }
    start() {
        this.timer = setInterval(() => { this.render() }, this.precision)
    }
}

const clock = new ExtendedClock({ template: 'h:m:s', precision: 2000 })
setTimeout(() => {
    console.log('start Stop')

    clock.stop()
}, 5000)

clock.start()