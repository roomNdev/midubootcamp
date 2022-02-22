const filterReducer = (state=null, action) => {
    switch (action.type) {
        case 'FILTER_CHANGE':
            return action.data
        default:
            return state
    }
}

export default filterReducer

export const filterChange = (filter) =>{
    return {
        type: 'FILTER_CHANGE',
        data: filter
    }
}
