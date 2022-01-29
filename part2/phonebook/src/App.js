/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState,useEffect } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [allPersons,setAllPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        const data = response.data
        setPersons(data)
        setAllPersons(data)
      })
      .catch((e) => console.error(e));
  }, [])

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