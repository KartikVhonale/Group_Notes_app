import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Profile() {
  const [userQuotes, setUserQuotes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          toast('You are not sigin');
          navigate('/signin');
          return;
        }

        const quotesResponse = await axios.get('http://localhost:3000/myqoute', {
          headers: {
            Authorization: storedToken
          }
        });

        if (quotesResponse.data) {
          console.log(quotesResponse.data.quotes);
          setUserQuotes(quotesResponse.data.quotes);
          const currentUser = {
            name: quotesResponse.data.quotes[0].user
          }
          setUser(currentUser)
        }
      } catch (error) {
        console.log('Eroor fetching data', error);
      }
    };
    fetchData()
  }, [])
  return (
    <div className="container my-container">
      {user && (
        <div className="center-align">
          <img className='circle' style={{ border: "2px solid", marginTop: '10px' }} src="https://robohash.org/vivek.png?size=200x200" alt="user photo" />
          <h5>{user.name}</h5>
        </div>
      )}

      {userQuotes.length > 0 ? (
        <>
          <h3>Your quotes</h3>
          {userQuotes.map((quote, index) => (
            <blockquote key={quote.id}>
              <h6>{quote.msg}</h6>
            </blockquote>
          ))}
        </>
      ) :( <h4>No Quotes Availabe</h4>)
      }

    </div>
  )
}
