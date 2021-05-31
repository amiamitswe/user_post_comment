import { baseURL } from '../../../config.json'

const getContacts = (dispatch) => {

  // dispatch({
  //   type: "SAVE_POSTS"
  // })


  const data = async () => {
    const url = 'posts'
    const setting = {
      method: 'GET',
      type: "cors"
    }
    const response = await fetch(baseURL + url, setting)
    return response
  }

  data().then(response => {
    if (response.ok) {
      const data = response.json()
      dispatch({ type: 'SAVE_POSTS', payload: data })
    }
  })
}

export default getContacts