export const PersonForm = (props) => {
    return(<form onSubmit={props.handlerSubmit}>
      <div>
        name: <input value={props.newName} type="text" onChange={props.handlerNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} type="text" onChange={props.handlerNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>)
}