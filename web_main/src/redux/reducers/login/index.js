// ** Initial State
const initialState = {
    login: localStorage.getItem('login') == null ? false : true
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LOGIN':
            return { ...state, login: action.login }
        case 'UPDATE_LOGIN':
            return { ...state, login: action.status }
        default:
            return state
    }
}

export default loginReducer