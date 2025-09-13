import axios from "axios"
import { api } from "./Host"


export const loginApi=(data)=>{
    return (axios.post(`${api}/login/`, data))
}