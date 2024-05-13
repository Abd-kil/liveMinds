import axios from "axios";
export default axios.create({
    baseURL:'https://liveminds.onrender.com/api/v1/',
    timeout:'600000'
})