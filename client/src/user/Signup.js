import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password, firstName, lastName);
        // 
        if (!email || !password || !firstName || !lastName) {
            toast.info('All fields are mendoty');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                firstName,
                lastName,
                email,
                password
            });
            console.log(response)
            if (response.data) {
                toast.success('User signup sucessfully');
                navigate('/signin')
            }
        } catch (error) {
            console.log(error)
            // console.log(error.response.data)
            if (error.response.data.error) {
                toast.error(error.response.data.error);
                return;
            };
            if (error.response.data) {
                toast.error(error.response.data);
                return;
            };



            toast.error('Something went wrong!!!');
        }
    }

    return (
        <div className='container my-container'>
            <h5>Signup!</h5>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <Link to='/signin'><p>Already have an account?</p></Link>
                <button className='btn #673ab7 deep-purple' type='submit'>Submit</button>
            </form>

        </div>
    )
}
