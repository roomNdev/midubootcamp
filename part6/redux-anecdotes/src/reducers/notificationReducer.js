const notificationReducer = (state=null, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.message
    case 'DELETE_NOTIFICATION':
        return null
    default: 
        return state
    }
}

export default notificationReducer

export const setNotification = (content, duration)=>{
    if(window._notificationTimeOut){
        window.clearTimeout(window._notificationTimeOut)
    }
    return async (dispatch) => {
        dispatch({
        type: 'SET_NOTIFICATION', 
        message: content
        })
        window._notificationTimeOut = setTimeout(() =>
            dispatch({
                type: 'DELETE_NOTIFICATION'
                })
            , duration * 1000
        )    
    }
}

export const deleteNotification = ()=>{
    return {
        type: 'DELETE_NOTIFICATION'
    }
}