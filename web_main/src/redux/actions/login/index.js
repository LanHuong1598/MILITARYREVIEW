export const getLogin = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_LOGIN',
            login: getState().login
        })
    }
}
export const updateLogin = (status) => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_LOGIN',
            status: status
        })
    }
}