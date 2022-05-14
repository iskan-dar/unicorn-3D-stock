import { LOAD_STL } from "./action.types";
import axios from 'axios';

export const setStl = (data) => ({ type: LOAD_STL, payload: data });

export const getStlFromBack = (stlPath) => async (dispatch) => {
    const res = await axios({
        method: 'post',
        url: 'http://localhost:4000/items/stl',
        data: { stlPath },
        responseType: 'arraybuffer',
            });

    console.log('AClog=====>',res)
    dispatch(setStl(res.data))

};
