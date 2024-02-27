import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        // axios({
        //     method: 'POST',
        //     url: 'http://localhost:3000/login',
        //     data: inputs
        // }).then((response) => {
        //     console.log(response.headers['authorization'])
        //     localStorage.setItem('token', response.headers['authorization'])
        //     navigate('/soundBoard')
        //     // alert('Vous êtes connecté')

        // }).catch((error) => {
        //     console.error(error)
        //     alert('Une erreur est survenue lors de la connexion')
        // })
                navigate('/soundBoard')
        
    }

    return (
        <form onSubmit={handleSubmit} >
            <input
                type="email"
                placeholder="Email"
                value={inputs.email}
                onChange={(e) => setInputs({...inputs, email: e.target.value})}
            />
            <input
                type="password"
                placeholder="Password"
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
            <button type="submit">Login</button>
        </form>
        
    );
}

export default LoginForm;