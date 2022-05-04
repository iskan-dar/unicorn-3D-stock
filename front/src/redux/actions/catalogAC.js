import axios from 'axios'
import { SET_CATALOG_ITEMS } from './action.types'

export const setCatalogItems = value => ({ type: SET_CATALOG_ITEMS, payload: value })

export const getCatalogItems = () =>  async (dispatch) => {
   axios.get('http://localhost:4000/catalog')
    .then((res) => {
       dispatch(setCatalogItems(res.data))
   })
}

