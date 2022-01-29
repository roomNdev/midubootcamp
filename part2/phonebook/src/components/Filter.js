export const Filter = (props) => {
    return(
    <form>
      <div>
        filter shown with <input onChange={props.handlerChangeFilter} />
      </div>
    </form>
    )
  }  