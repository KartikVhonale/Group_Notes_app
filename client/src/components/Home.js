import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'; // Import your custom CSS file

export default function Home() {
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
    <div className='quote-container'>
      {quotes.map((quote) => (
        <div key={quote.id} className='quote-card'>
          <blockquote className='quote-content'>
            <h6 className='quote-message'>{quote.msg}</h6>
            <p className='quote-user right-align'>{quote.user}</p>
          </blockquote>
        </div>
      ))}
    </div>
  );
}
