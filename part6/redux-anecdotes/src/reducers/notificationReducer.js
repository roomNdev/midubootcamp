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

export const setNotification = (content)=>{
    return {
        type: 'SET_NOTIFICATION', 
        message: content
    }
}

export const deleteNotification = ()=>{
    return {
        type: 'DELETE_NOTIFICATION'
    }
}