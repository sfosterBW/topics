import axios from 'axios'
import { toTopics } from './parser'

const getTopics = async () => {
  try {
    const { data } = await axios.get('/topics')
    return toTopics(data)
  } catch (error) {
    throw new Error(`No data returned: ${error}`)
  }
}

export {
  getTopics
}
