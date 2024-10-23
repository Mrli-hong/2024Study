//封装一个hashRouter

class HashRouter {
    constructor() {
        this.routes = {};    //page => component 对象
        window.addEventListener("hashchange", this.load.bind(this), false);
    }
    register(hash, callback = function () { }) {
        this.routes[hash] = callback;
    }
    registerIndex(callback = function () { }) {
        this.routes["index"] = callback;
    }
    load() {
        let hash = location.hash.slice(1)//去掉#号 然后就是路由
        let handler
        if (!hash) {
            // 去到首页
            handler = this.routes["index"]
        } else {
            // 去相应的页面
            handler = this.routes[hash]
        }
        handler && handler.call(this)  // 确保handler存在才执行后面那个
    }
}

export default HashRouter