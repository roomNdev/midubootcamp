export const Part = (props)=>{
    return(props.parts.map( (parts)=>{
        return(
          <span key={parts.id}>
            <p>{parts.name} {parts.exercises}</p>
          </span>
        )
      }
    )
  )
}