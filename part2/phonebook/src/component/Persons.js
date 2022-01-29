export const Persons = ({filter}) => {
    return (
      <>
        {filter.map((persons) => {
          return (
            <p key={persons.id}>
              {persons.name} {persons.number}
            </p>)
            }
        )}
      </>
    )
  }