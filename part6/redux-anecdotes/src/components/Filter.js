import {connect} from 'react-redux'
import {filterChange} from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        const value =  event.target.value
        props.filterChange(value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  const mapDispatchToProps = {
    filterChange,
  }

const connectedFilter = connect(
  null,
  mapDispatchToProps
)
(Filter)

export default connectedFilter