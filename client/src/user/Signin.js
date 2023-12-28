import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signin({setIsLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password)
    // navigate('/');
    if (!email || !password) {
      toast.info('All fields are mendoty');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', {
        email,
        password
      });
      if (response.data) {
        // console.log(response.data.jwtToken);
        localStorage.setItem('token', response.data.jwtToken);
        setIsLogin(true);
        navigate('/');
      }
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
        return;
      };
      toast.error('Something went wrong');
    }
  }

  return (
    <div className='container my-container'>
      <h5>Signin!</h5>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to='/signup'><p>Dont have an account?</p></Link>
        <button className='btn #673ab7 deep-purple' type='submit'>Siginin</button>
      </form>

    </div>
  )
}
