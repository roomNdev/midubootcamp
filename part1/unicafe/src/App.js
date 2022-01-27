import React, { useState } from 'react'

const Statistics = (props) => {
    return(
    <tr><td>{props.text}</td><td>{props.stat}</td></tr>
  )
}

const ButtonIncrease = (props) => {
  return(
  <>
    <button onClick={props.function}>{props.text}</button>
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / all;


  let handleClickGood =()=>{
    setGood((prevGood) =>{
      return prevGood + 1;
    })
  }

  let handleClickNeutral =()=>{
    setNeutral((prevNeutral) =>{
      return prevNeutral + 1;
    })
  }

  let handleClickBad =()=>{
    setBad((prevBad) =>{
      return prevBad + 1;
    })
  }

  let conditional = all !== 9 
  ? 
  <table>
    <thead><Statistics text='good ' stat={good}/></thead>
    <tbody>
    <Statistics text='neutral ' stat={neutral}/>
    <Statistics text='bad ' stat={bad}/>
    <Statistics text='all ' stat={all}/>
    <Statistics text='average ' stat={average}/>
    <Statistics text='positive ' stat={positive}/>
  </tbody>
  </table>
  :
  <p>No feedback given</p>
  ;

  return (
    <div>
      <h1>Give feedback</h1>
      <ButtonIncrease function={handleClickGood} text={'good'}/>
      <ButtonIncrease function={handleClickNeutral} text={'neutral'}/>
      <ButtonIncrease function={handleClickBad} text={'bad'}/>
      <h1>Statistics</h1>
      <>{conditional}</>
    </div>
  )
}

export default App