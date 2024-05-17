import { useContext, useState } from "react";
import axios from "../../api/axios";
import './signUp.css'
import { useAuth } from "../../context/AuthProvider";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {auth, setAuth} = useAuth();

    const handleUsernaem = (e:any) =>{
        setUsername(e.target.value)
    }
    const handlePassword = (e:any) =>{
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(
                'login',
                JSON.stringify({ usernameOrEmail: username, password })
            )
            setAuth({isLoggedIn: true, user: response?.data});
            console.log(response?.data)
            setUsername('');
            setPassword('');
        }
        catch (error) {
            console.error(error)
        }
        setIsLoading(false);
    }
    
    return (
        <div className="sign-up">
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Log in</h1>
                    <p>Enter your details below</p>
                    <input type="text" placeholder="Email or Username" name="email" required onChange={handleUsernaem}/>
                    <input type="password" placeholder="Password" name="password" required  onChange={handlePassword}/>
                    <button type="submit" disabled={isLoading}>{isLoading?"loading...":"Login"}</button>
                </form>
            </div>
        </div>
    );
}
export default Login;