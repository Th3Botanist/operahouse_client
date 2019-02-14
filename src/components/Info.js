import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'
import './info.css'
import Dance from './images/dance.jpg';

import Nav from './Nav';



function Info(props) {

  // Creates a filtered URL from the current url to find the current EVENT NAME
  const name = props.match.params.name.replace(/_/g, ' ');
  const genre = props.match.params.genre.replace(/_/g, ' ');
  const URL = window.location.href
  const request = {"booking": {"seat_id": seatID, "user_id": currentUser}}
  const header = {"headers": {"Authorization": localStorage.Authorization}}
  const [seatID, setSeatID] = useState()
  const [events, setEvent] = useState([]);
  const [currentUser, setCurrentUser] = useState(false) //userID
  const [message, setMessage] = useState('')
  const [activeSeat, setSeatToggle] = useState(false)

// Authorize User //
  const checkAuthOfApi = async (req, res) => {
   const response = await axios
       .get("http://localhost:3000/auth", req)
           // If response, populate api hook with Auth token and format
           console.log(response.data)
           setMessage(response.data.msg)
           setCurrentUser(response.data.user_id)
        }
  checkAuthOfApi(header)




    // Hook for Axios to retrieve data.
    useEffect(() => {
        getDataFromApi();
    }, [])
    const getDataFromApi = async () => {
        const response = await axios
            .get(`http://localhost:3000/events.json`);
        setEvent(response.data)
    }

    // if current User
    // arr selected seats pushed from add seat, book sends all data to form.
    // or axios request sent when all selected seats and book button pressed.
    // post request arrSeats.each do post update >>> axios re append uID

    const addSeat = (seat) => {
      console.log(seat)
      activeSeat === true ? setSeatToggle(false) : setSeatToggle(true);
      console.log(activeSeat)

    }
          const [seats, setSeat] = useState([]);

          // Hook for Axios to retrieve data.
          useEffect(() => {
              getSeatFromApi();
          }, [])
          const getSeatFromApi = async () => {
              const response = await axios
              .get(`http://localhost:3000/seats.json`);
              setSeat(response.data)
          }

    return (
      <div>
      < Nav />
      <div class="container">
      <div class="left-page">
          <span class="date">19th January 2019</span>
          <span class="cat"><Link to={'/events/' + genre + '/' + name + '/booking'}>Book Ticket</Link></span>
          <span class="cat2"><Link to={'/events/' + genre + '/' + name + '/booking'}>Book Ticket</Link></span>
          <h1 class="title">{name} <span>{name}</span></h1>
          <span class="author">Opera House</span>
     </div>
        <div class="right-page">
          <p><h1> {name} </h1> <hr /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis </p>

      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'>
          <g id='Layer_3'>
              <path fill='#deffea' d='M677 775l24-234h537l7 234z' />
              <path className='st1' d='M677 775h568v40H677z' />
          </g>
          <g id='Layer_4'>
              <path d='M613 661l44-145c5.22-25.57 22.85-94.49 85-151 87.06-79.16 193.91-72.52 213-71 27.74-1.34 121.27-2.37 208 63 62.15 46.84 90.51 104.94 102 133 14.33 57 28.67 114 43 171h-97l-25-103H735l-22 103H613z'
              fill='#ffdce9' />
              <path className='st1' d='M613 662v30l100 1 24-110c67.05-8.27 143.61-13.75 228-13 75.2.67 143.93 6.18 205 14 8.33 37 16.67 74 25 111l113 2v-35h-97l-26-103c-66.17-7.08-139.51-11.77-219-12-84.19-.24-161.6 4.57-231 12-7.33 34.33-14.67 68.67-22 103H613z'
              />
          </g>
          <g id='Layer_5'>
              <path d='M545 488h117l45-189c38.26-23.1 134.77-74.36 267-71 117.76 2.99 203.57 47.77 242 71l45 189h115c-2.09-65.82-13.9-164.4-62-272-24.77-55.4-53.54-100.63-80-136-30.59-18.37-72.89-39.6-126-55C1045.28 6.82 990.25 3.38 951 4c-33.02-.65-78.74 1.94-131 16-55.91 15.04-99.01 37.75-128 56-28.46 42.08-59.47 95.76-86 161-39.57 97.33-54.98 185.53-61 251z'
              fill='#d9ddff' />
              <path className='st1' d='M545 488v31l125-4 45-191c38.2-21.86 125.3-64.88 244-65 119.28-.12 206.79 43.14 245 65 13.67 65.33 27.33 130.67 41 196h131v-32h-115l-45-189c-38-22.91-131.45-72.3-260-71-122.73 1.24-211.91 48.03-250 71-14.67 63-29.33 126-44 189H545z'
              />
          </g>
          <g id='Layer_6'>
              {seats.map((seat) =>
              <circle onClick={() => addSeat(seat.id)} className={"seat" + seat.id} className="st3" data={seat.id} cx={seat.cx} cy ={seat.cy} r={seat.r} stroke="green" fill="#edebff"/>
              )
            }
          </g>
      </svg>
      </div>
      </div>
      </div>
    );
}

export default Info;
