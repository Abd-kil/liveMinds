import axios from "axios";
export default axios.create({
    baseURL:'https://liveminds.onrender.com/api/v1/',
    withCredentials:true,
    headers:{
        "Content-Type": "application/json" 
    }
})