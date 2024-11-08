const eventList = {}
const mixin = {
    trigger(name, ...arguments) {
        if (eventList[name]) {
            console.log(this, 'trigger')
            eventList[name].forEach(item => {
                item.callback(...arguments)
            });
        }
    },
    on(name, callback) {
        !eventList[name] && (eventList[name] = [])
        eventList[name].push({ target: this, callback })
    },
    off(name, handler) {
        if (eventList[name]) {
            const targetHandlerIndex = eventList[name].findIndex(item => item.callback === handler)
            eventList[name].splice(targetHandlerIndex, 1)
        }
    }
}

class User {
    constructor(name) {
        this.name = name
    }
    Login() {
        this.trigger('login', this.name)
    }
}

class Calendar {
    recordLogin(name) {
        console.log('Calendar save', name, this)
    }
}

Object.assign(User.prototype, mixin)
Object.assign(Calendar.prototype, mixin)

const lhy = new User('lhy')
const zxd = new User('zxd')
const calendar = new Calendar()

calendar.on('login', calendar.recordLogin)


lhy.Login()
zxd.Login()

calendar.off('login', calendar.recordLogin)

lhy.Login()
zxd.Login()