
import { useEffect } from "react";
import { redirect } from "react-router-dom";


const ProtectedRoutes = ({
    component: Component,
    ...rest
}) => {
    useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
        redirect('/')
    }
    },[])
    return (
        <Component {...rest} />
    );
}

export default ProtectedRoutes;