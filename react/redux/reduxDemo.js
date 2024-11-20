
const showCount = document.getElementsByClassName('show-count')
const addCount = document.getElementsByClassName('add-count')
const minusCount = document.getElementsByClassName('minus-count')
const changeUserAge = document.getElementsByClassName('changeUserAge')
const changeUserName = document.getElementsByClassName('changeUserName')
const bindActionCreatorsAddCount = document.getElementsByClassName('bindActionCreators-add-count')

const countReducer = (state = 0, action) => {
    const { type, payload } = action
    switch (type) {
        case "inc":
            return state + payload
        case "dec":
            return state - payload
        default:
            return state
    }
}

const userReducer = (state = { name: '张三', age: 18 }, action) => {
    const { type, payload } = action
    switch (type) {
        case 'changeUserName':
            return { ...state, name: payload }
        case 'changeUserAge':
            return { ...state, age: payload }
        default:
            return state
    }
}

// const store = Redux.createStore(countReducer)
const rootReducer = Redux.combineReducers({
    count: countReducer,
    userInfo: userReducer,
})

// 自定义中间件
const loggerMiddleware = (store) => (next) => (action) => {
    // 自定义逻辑
    console.log('dispatching', action)
    const result = next(action)
    console.log('next state', store.getState())
    return result
}

const store = Redux.createStore(rootReducer, Redux.applyMiddleware(ReduxThunk.default, loggerMiddleware))

const { dispatch, getState, subscribe } = store



const assignCount = () => {
    showCount[0].innerHTML = JSON.stringify(getState())
}
assignCount()

subscribe(assignCount)


// Action Creator
const incrementCount = (payload) => {
    return { type: 'inc', payload }
}


// 通过dispatch改变state之后通过 showCount[0].innerHTML = getState() 执行订阅方法
addCount[0].addEventListener('click', () => {
    dispatch(incrementCount(3))
})

// 直接传递creator
minusCount[0].addEventListener('click', () => {
    dispatch({ type: 'dec', payload: 2 })
})

// 简化creator
const boundCountActions = Redux.bindActionCreators({ incrementCount }, dispatch)

bindActionCreatorsAddCount[0].addEventListener('click', () => boundCountActions.incrementCount(3))


// 异步action，通常只支持返回plain得对象
const changeUserNameAction = (payload) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch({ type: 'changeUserName', payload })
        }, 1000)
    }
}

// dispatch(changeUserNameAction('李四'))

changeUserAge[0].addEventListener('click', () => dispatch(changeUserNameAction("Lhy")))
changeUserName[0].addEventListener('click', () => boundCountActions.incrementCount(3))




export default {}