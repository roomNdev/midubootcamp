import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newObject) => {
  const response = await axios.post(baseUrl, {
    content: newObject,
    votes: 0
  })
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`,newObject)
  return response.data
}

export default { getAll, createNew, update }