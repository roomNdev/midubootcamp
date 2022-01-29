/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { Persons } from './component/Persons'
import { PersonForm } from './component/PersonForm'
import { Filter } from './component/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [allPersons,setAllPersons] = useState([...persons])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const handlerNameChange = (event) => {
    console.log({newName});
    setNewName(event.target.value)
  }

  const handlerNumberChange = (e) => {
    console.log({newNumber});
    setNewNumber(e.target.value)

    console.log({newNumber});
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    if (newName == persons.map((persons) => { return (persons.name) })) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const addName = { name: newName, number: newNumber, id: allPersons.length + 1 }
      setAllPersons(allPersons.concat(addName))
      setNewName('')
      setNewNumber('')
    }
  }

 const filter = newFilter === ""
          ? allPersons
          : allPersons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    );

//doesn't work properly *****************(sorry 4 ur mom(now works properly))
  const handlerChangeFilter = ({target}) => {
    setNewFilter(target.value)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handlerChangeFilter={handlerChangeFilter}/>
      <h2>add a new</h2>
        <PersonForm handlerSubmit={handlerSubmit} newName={newName} handlerNameChange={handlerNameChange} newNumber={newNumber} handlerNumberChange={handlerNumberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} />
    </div>
  )
}

export default App