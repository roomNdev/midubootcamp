import {useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'

export const Anecdotes = ()=>{
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
return(
    <>
    {anecdotes
        .sort((a, b)=> b.votes-a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
    </>
    )
}