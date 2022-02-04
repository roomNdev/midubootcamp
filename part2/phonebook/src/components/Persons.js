export const Persons = ({filter, handlerDeletePerson}) => {
    return (
      <>
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