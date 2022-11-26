import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem('firstLogin');
    return firstLogin ? <Outlet {...props}></Outlet> : <Navigate to='/'></Navigate>;
};

export default PrivateRouter;