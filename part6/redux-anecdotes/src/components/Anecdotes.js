import {useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

export const Anecdotes = ()=>{
    const anecdotes = useSelector(state => state.anecdotes)
    const newFilter = useSelector(state => state.filter)
    const filter = newFilter === null
             ? anecdotes
             : anecdotes.filter((anecdote) =>
           anecdote.content.toLowerCase().includes(newFilter.toLowerCase())
       );
   
    const dispatch = useDispatch()
  
    const voteFunc = (anecdote)=>{
      anecdoteService
        .update({...anecdote, votes: anecdote.votes += 1})
        .then((res)=>{
          dispatch(addVote(anecdote.id))
          dispatch(setNotification(`you voted for '${anecdote.content}'`, 5))
        })
    }

return(
    <>
    {filter
        .sort((a, b)=> b.votes-a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                voteFunc(anecdote)
              }}>vote</button>
            </div>
          </div>
        )}
    </>
    )
}