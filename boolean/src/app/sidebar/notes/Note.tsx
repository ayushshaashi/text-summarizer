import React from 'react';
import {MdDeleteForever} from 'react-icons/md';

const Note = () => {
  return (
    <div className='note bg-[#3b3b3b] text-[#7b7b7b] rounded-2xl p-[0.7em] mb-[1em]'>
      <span className='font-bold text-[#dadada]'>Hello! my first Note</span>
      <div className='footer'>
        <small>26/03/2024</small>
        <MdDeleteForever className='delete-icon' size="1.3em"/>
      </div>
    </div>
  )
}

export default Note;