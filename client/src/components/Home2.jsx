// Home.js
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home2.css'; // Import your custom CSS file

export default function Home2() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/allquote');
        setQuotes(response.data.quotes);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='home2-container'>
    
      <header className='home2-header'>
        <h1>Welcome to Important Group Notes App</h1>
        <p>Explore and share your thoughts with the group!</p>
        <Link to="/home2" >
        <button class="btn-17">
  <span class="text-container">
    <span class="text">Get started</span>
  </span>
</button>

        </Link>
      </header>
      
      
    </div>
  );
}
