import {AnecdoteForm} from './components/AnecdoteForm'
import {Anecdotes} from './components/Anecdotes'
import {Notification} from './components/Notification'
import {Filter} from './components/Filter'

const App = () => {
  return (
    <div>
      <Filter/>
      <Notification/>
      <h2>Anecdotes</h2>
      <Anecdotes/>
      <AnecdoteForm/>
    </div>
  )
}

export default App