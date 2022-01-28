export const Total = (props)=>{
    return (
    <p><strong>total of {
          props.parts.map( parts=> parts.exercises).reduce((a, b)=>{
              return(
                a + b
              )
            }
          )
        } exercises</strong>
      </p>
    )
  }