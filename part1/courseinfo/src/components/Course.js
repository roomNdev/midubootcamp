import {Header} from './Header'
import {Content} from './Content'
import {Total} from './Total'

export const Course = (props)=>{
    return (
      props.course.map( (all)=>{
        return(
          <div key={all.id}>
            <Header name={all.name}/>
            <Content parts={all.parts}/>
            <Total parts={all.parts}/> 
          </div>)
        }
      )  
    )
  }
  