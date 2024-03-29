import React from 'react';
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from "react-router-dom"
import {useField} from './hooks/index'

const Menu = ({anecdotes, addNew}) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/about' style={padding}>about</Link>
      <Link to='/add' style={padding}>create new</Link>
      
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/about' element={<About/>} />
        <Route path="/add" element={<CreateNew addNew={addNew}/>} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>} />
      </Routes>
    </Router>
  )
}

const Anecdote = ({anecdotes})=>{  
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => Number(anecdote.id) === Number(id))
  return (
    <>
      <h1>{anecdote.content}</h1>
      <p>{anecdote.author}</p>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
      anecdotes
        .map(anecdote => 
          <li key={anecdote.id} >
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )
      }
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({addNew}) => {
  const navigate = useNavigate()

  const content = useField('')
  const author = useField('')
  const info = useField('')


  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdoteToAdd = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }
    addNew(anecdoteToAdd)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={(e) => content.onChange(e)} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={(e) => author.onChange(e)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={(e)=> info.onChange(e)} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() =>{
        content.resetFields()
        author.resetFields()
        info.resetFields()
      }}>reset</button>
    </div>
  )

}

const Notification = ({message})=>{
  return(
    <>
    <p>{message}</p>
    </>
  )
}

const App = () => {
  const [anecdotes, setAnecdote] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdote(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created!`)
    setTimeout(() =>{
      setNotification(undefined)
    },5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdote(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification message={notification}/>
      <Menu anecdotes={anecdotes} addNew={addNew}/>
      <Footer></Footer>
    </div>
  )
}

export default App
