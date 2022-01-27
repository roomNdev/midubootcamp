import React, { useState } from 'react'

  const points = { 0: 1, 1: 3, 2: 4, 3: 2, 4: 4, 5: 0 ,6: 0 };
  const pointsCopy = {...points};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [votes, setVotes] = useState()

  const addVote = () =>{
    pointsCopy[selected] += 1
    setVotes(pointsCopy[selected])
  }
  const getMax = () => {
    return Object.keys(pointsCopy).reduce((a, b) => pointsCopy[a] > pointsCopy[b] ? a : b);
//reduce() get as param two values of the array returned by the object.keys
//and then compare them returning the one with the higher value,
//then gets another value of the array and compare it returning the higher 
//value and so on with all the values of the array, returning at last
//the highest of all
};

  const setRandomAnecdote = () =>{
    setSelected(Math.floor(Math.random()*7))
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {pointsCopy[selected]} votes</p>
      <button onClick={addVote}>vote</button>
      <button onClick={setRandomAnecdote}>Next anecdote</button>
      <h1>Anecdote with most vote</h1>
      <p>{anecdotes[getMax()]}</p>
    </div>
  )
}

export default App