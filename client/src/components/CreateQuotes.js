import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CreateQuotes.css'; // Import your custom CSS file

export default function CreateQuotes() {
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        toast('You are not signed in');
        navigate('/signin');
        return;
      }

      if (!quote) {
        toast.info("Quote cannot be empty");
        return;
      }

      const quotesResponse = await axios.post(
        'http://localhost:3000/createquote',
        { msg: quote },
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );

      if (quotesResponse.data) {
        toast.success('Note Added!!');
        setQuote('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='quote-container'>
      <form className='quote-form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Write your note here'
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className='quote-input'
        />
        <button className='quote-btn #673ab7 deep-purple' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
}
