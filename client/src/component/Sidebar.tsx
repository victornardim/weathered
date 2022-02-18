import React, { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import '../style/component/Sidebar.css';

export default function Sidebar({ children }) {
  let [isOpen, setIsOpen] = useState(true);

  const handleState = () => setIsOpen(!isOpen);

  return (
    <aside id='sidebar' className={isOpen ? 'open' : 'closed'}>
      <div id="side-content">
        <button id='open-sidebar-button' onClick={handleState}>
          {
            isOpen ?
              <MdArrowForwardIos size={30} className='rotate'></MdArrowForwardIos> :
              <MdArrowBackIos size={30} className='rotate'></MdArrowBackIos>
          }
        </button>
      </div>
      <main id='main-content'>
        {children}
      </main>
    </aside>
  );
}