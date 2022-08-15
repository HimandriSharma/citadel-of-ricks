import { FETCH_API_FAILURE, FETCH_API_REQUEST, FETCH_API_SUCESS } from "./ResponseTypes"
import axios from "axios"

export const fetchApiRequest = () => {
    return{
        type: FETCH_API_REQUEST
    }
}

export const fetchApiSucess = data => {
    return{
        type: FETCH_API_SUCESS ,
        payload: data
    }
}

export const fetchApiFailure = err => {
    return{
        type: FETCH_API_FAILURE,
        payload: err
    }
}

export const fetchData = () => {
    return (dispatch) => {
        dispatch(fetchApiRequest)
        axios.get('https://rickandmortyapi.com/api/character')
        .then(res=>{
            const chars = res.data
            console.log(chars)
            dispatch(fetchApiSucess(chars))
        })
        .catch(err=>{
            const errMsg = err.message;
            console.log(errMsg);
            dispatch(fetchApiFailure(errMsg))
        })
    }
}