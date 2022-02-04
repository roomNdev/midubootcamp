
export const Persons = ({filter, handlerDeletePerson}) => {
    return (
      <>
      {console.log(filter)}
        {filter.map((persons) => {
          return (
            <p key={persons.id}>
              {persons.name} {persons.number} <button onClick={()=>handlerDeletePerson(persons.name,persons.id)}>delete</button>
            </p>)
            }
        )}
      </>
    )
  }