import { INCREMENT, DECREMENT, SETVAL } from "./StateType";

export const increment = () => {
    return{
        type: INCREMENT
    }
}

export const decrement = () => {
    return{
        type: DECREMENT
    }
}

export const setValue = (val) =>{
    return {
        type: SETVAL,
        payload: val
    }
}