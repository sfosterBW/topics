import axios from 'axios'
import { toTopics } from './parser'
import { url } from './consts'

const getTopics = async () => {
  try {
    const { data } = await axios.get(`${url}/topics`)
    return toTopics(data)
  } catch (error) {
    throw new Error(`No data returned: ${error}`)
  }
}

export {
  getTopics
}
