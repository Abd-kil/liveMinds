import { useState } from "react";
import axios from "../../api/axios";
import './signUp.css'
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUsernaem = (e:any) =>{
        setUsername(e.target.value)
    }
    const handlePassword = (e:any) =>{
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'login',
                JSON.stringify({ usernameOrEmail: username, password }),
                // {
                //     headers: { "Content-Type": "application/json" },
                //     withCredentials: true
                // }
            )
            console.log(JSON.stringify(response?.data));
            setMessage(JSON.stringify(response?.data))
        }
        catch (error) {
            console.error(error)
            setMessage(JSON.stringify(error));
        }
    }
    return (
        <div className="sign-up">
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Log in</h1>
                    <p>Enter your details below</p>
                    <input type="text" placeholder="Email or Username" name="email" required onChange={handleUsernaem}/>
                    <input type="password" placeholder="Password" name="password" required  onChange={handlePassword}/>
                    <button type="submit">Log in</button>
                </form>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
}
export default Login;