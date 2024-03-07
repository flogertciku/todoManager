import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({loguser,setLogUser}) => {
   
    const navigate = useNavigate();
    const [user, setUser] = useState({ password: '', confirmPassword: '', email: '', firstName: '', lastName: ''});
    const [loginUser, setLoginUser] = useState({ email: '', password: ''});
    const Register = (e) => {

        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
        .then(res => {
            console.log(res)
            // const userId = res.data.user._id;
            setLogUser({id:res.data.user._id,email:res.data.user.email});
            localStorage.setItem('userId', res.data.user._id);
            window.location.href = '/';
            // navigate('/');

        })
        .catch(err => console.log(err));
    };
    const LogIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', loginUser, { withCredentials: true })
        .then(res => {console.log(res)
            setLogUser({id:res.data.user._id,email:res.data.user.email});
            localStorage.setItem('userId', res.data.user._id);
            window.location.href = '/';
            // navigate('/');
        })
        .catch(err => console.log(err));
    }
  
    return (
    <div>
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={Register}>
                <input type="text" placeholder="FirstName" onChange={(e)=>setUser({...user,firstName:e.target.value})} />
                <input type="text" placeholder="LastName" onChange={(e)=>setUser({...user,lastName:e.target.value})} />
                <input type="email" placeholder="Email" onChange={(e)=>setUser({...user,email:e.target.value})} />
                <input type="password" placeholder="Password" onChange={(e)=>setUser({...user,password:e.target.value})} />
                <input type="password" placeholder="Confirm Password" onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        <div>
            <h1>Log In</h1>
            <form onSubmit={LogIn}>
                <input type="email" placeholder="Email" onChange={(e)=>setLoginUser({...loginUser,email:e.target.value})} />
                <input type="password" placeholder="Password" onChange={(e)=>setLoginUser({...loginUser,password:e.target.value})} />
                <button type="submit">Log In</button>
            </form>
        </div>
    </div>
  );
}
export default Auth;