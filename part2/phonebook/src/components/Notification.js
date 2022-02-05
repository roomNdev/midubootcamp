export const Notification = ({ message }) => {
    if (message === "") {
      return null
    }
    // if (message.includes("Information")) {
    //     return(
    //         <div className='error'>
    //           {message}
    //         </div>)
    // }
    console.log(message);
    return (
      <div className='success'>
        {message}
      </div>
    )
  }