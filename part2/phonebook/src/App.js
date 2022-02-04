import React, { useState,useEffect } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { Notification } from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() =>{
    personService
      .getAll()
      .then(response =>{
        setPersons(response)
      })
      .catch((e) => console.error(e));
  }, [])

  const handlerNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlerNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    const match = (name1,name2)=>name1.toLowerCase() === name2.toLowerCase()
    const person = persons.find((person)=>match(person.name, newName))

  if(person){
      if (window.confirm(`${person.name} is already added to the phonebook, do you want to change the number to ${newNumber}?`)){
        const personToUpdate = {...person, number: newNumber}
        personService
        .update(person.id,personToUpdate)
        .then((res)=>{setPersons(persons.filter((person)=>person.name !== personToUpdate.name).concat(res))
        setNewName('')
        setNewNumber('')
          setMessage(
          `Updated '${person.name}' `
        )
        setTimeout(() => {
          setMessage("")
        }, 5000)
          }
        )
        .catch(error => {
          setMessage(
            `Information of '${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setMessage("")
          }, 5000)
          setPersons(persons.filter(n => n.name !== person.name))
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else {
      const addName = { name: newName, number: newNumber}
      personService
      .create(addName)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(
          `Added '${addName.name}' `
          )
        setTimeout(() => {
          setMessage("")
        }, 5000)
        setNewName('')
        setNewNumber('')})
      .catch((e) => console.error(e))
    }
  }

 const filter = newFilter === ""
          ? persons
          : persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    );

//doesn't work properly *****************(sorry 4 ur mom(now works properly))
  const handlerChangeFilter = ({target}) => {
    setNewFilter(target.value)
  }

  const handlerDeletePerson = (name,id) => {
    if(window.confirm(`Delete ${name}?`))
    personService
      .deletePerson(id)
      .then(setPersons(persons.filter((person) => person.id !== id)))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter handlerChangeFilter={handlerChangeFilter}/>
      <h2>add a new</h2>
        <PersonForm handlerSubmit={handlerSubmit} newName={newName} handlerNameChange={handlerNameChange} newNumber={newNumber} handlerNumberChange={handlerNumberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} handlerDeletePerson={handlerDeletePerson} />
    </div>
  )
}

export default App