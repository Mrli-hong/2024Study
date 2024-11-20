// import Redux from "./redux.js"
// import RTK from "./redux-toolkit.umd.js"

const countReducer = (state = 0, action) => {
    const { type, payload } = action
    switch (type) {
        case 'incrementCount':
            return state + payload
        case 'decrementCount':
            return state - payload
        default:
            return state
    }
}


// 使用Redux Toolkit的configureStore方法创建store
// reducer属性就是所有reducer的集合，这里写法简化了使用combineReducers来整合所有reducer
const store = RTK.configureStore({
    reducer: {
        counter: countReducer
    },
})

// 创建 action
const incrementCount = RTK.createAction('incrementCount')
const decrementCount = RTK.createAction('decrementCount')

console.log(incrementCount(3), decrementCount(2))

// 使用createReducer可以直接修改对象
RTK.createReducer({ name: 'lisi', age: 20 }, {
    [incrementCount]: (state, action) => state.age = action.payload,
    [decrementCount]: (state, action) => state.age = action.payload - 2
})

export default {}