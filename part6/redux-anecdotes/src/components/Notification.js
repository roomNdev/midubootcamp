import {useSelector} from 'react-redux'

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = notification === null
  ?{display: 'none'}
  :{
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}


export const notification =(dispatch, deleteNotification) => {
  setTimeout(() => dispatch(deleteNotification()),5000)
}