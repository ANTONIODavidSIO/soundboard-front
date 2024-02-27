import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";


const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    );
}

export default Login;