"use client";
import React from 'react'
import Boolean from './Boolean.svg';
import Image from 'next/image';
import User from './user.jpg';
import bg from './bg.svg';
import slider from './slider.svg';
import { useState , useEffect } from 'react';
import './sidebar.css';
import B from './B.svg';
import mag from './mag.svg';
// import Notelist from './notes/notelist';
import imgup from './imgup.svg';
// import { summarizeText } from './localhost:5000'; // Import the fetch function

const sidebar = () => {
  const [isRetracted, setRetracted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const API_URL = 'http://localhost:5000/summarize'; 

  const handleSliderClick = () => {
    var element = document.getElementById('imageInput');
    if (element) {
      element.click();
    }
    setRetracted(!isRetracted);
  };

  const handleSearch = async () => {
    if (!inputValue) return; // Handle empty input gracefully
  
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article: inputValue }),
    });
  
    if (!response.ok) {
      console.error('Error fetching summary:', response.statusText); // Log error message
      setAnswer('An error occurred. Please try again.'); // Set error message
      return; // Exit the function early on error
    }
  
    const data = await response.json();
    setAnswer(data.summary);
    setQuestion(inputValue);
    setInputValue(''); // Clear input after successful search
  };
  

  const sidebarClasses = `flex flex-col justify-between flex min-h-[100vh] max-w-[28vw] ${isRetracted ? 'retracted' : ''}`;

  return (
    <div className='material flex bg-[#7c7c7c] min-h-[100vh]'>
      <div className='sidebar flex bg-[#1e1e1e]'>
        <div className={sidebarClasses}>

          <div className="logo flex-col">
            <Image src={Boolean} alt="" className='object-fit ml-[2vh] mt-[2vh] mr-[1vh]'/>
          </div>

          <div className="functionality text-2xl font-bold text-[#7b7b7b] text-center">
            <ul>
              <li className='hover:bg-black mb-4 pt-1 ml-[2vw] pb-1 max-w-[13vw] rounded-lg'><a href='#'>+ New Chat</a></li>
              <li className='hover:bg-black mb-4 pt-1 pb-1 ml-[2vw] max-w-[13vw] rounded-lg'><a href='#' >Notes</a></li>
              <li className='hover:bg-black pt-1 pb-1 max-w-[13vw] ml-[2vw] rounded-lg'><a href='#' >Translate</a></li>
            </ul>
          </div>        

          <div className="user-details">
            <a href="#" className='items-center justify-center flex hover:bg-black ml-[2.3vw] max-w-[24vw] pt-[1.3vh] pb-[1.3vh] max-h-[300%] mb-[0.5vw] rounded-lg'>
              <Image src={User} alt="" className='rounded-full w-[2vw] self-center'/>
              <span className='text-white font-bold ml-4 text-xl '>Ayush Shashi</span>
            </a>
          </div>

        </div>

        <div className='slider min-w-[3vh] flex top-[40%] justify-center align-middle'>
            <button onClick={handleSliderClick}><Image src={slider} alt="" className='min-w-[0.6vh]'/></button>
        </div>
      </div>



      <div className='prompt-area min-w-[64vw] w-[100%]'>
        {isRetracted && 
        <div className='logoB flex-col'>
          <button onClick={handleSliderClick}>
            <Image src={B} alt="" className='object-fit ml-3  mr-3'/>
          </button>
        </div>}
        <div className='output border-[#1e1e1e] pl-[4em] pr-[4em] p-[1em] mt-[2.5em] bg-[#7c7c7c] ml-[5em] mr-[5em]'>
          <span className='ques font-bold text-[#] '>{question}</span><br/>
          <span className='ans text-[#1e1e1e]'>{answer}</span>
          {/* <div className='bgcontainer'>
            <div className='bg bgimage'></div>
          </div> */}
        </div>
        <div className="prompt-container w-[83vw] flex justify-center p-[0]">
          <div className='prompt-button self-center flex justify-center rounded-2xl bg-[#1e1e1e] p-[0.2vw] pb-[0.9vw] w-[95%]'>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='prompt-input min-h-[7vh] max-h-[20vh] w-[61.5em] p-2 border rounded-xl border-[#1e1e1e] text-xl focus:outline-none bg-[#464646] text-white'
              placeholder='Type what you want to Summarize'
            />
            <div className='flex items-center'>
              <button onClick={handleSearch}>
                <Image src={mag} alt="" className='m-[0.1em]' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='notes-bar min-w-[13em] bg-[#1e1e1e] p-[0.5em]'>
        <Notelist/>
      </div> */}
  
    </div>
  )
}

export default sidebar;