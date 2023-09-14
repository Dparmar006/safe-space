import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import ChatToggle from './ChatToggle'

const Header = () => {
  return (
    <div className='navbar rounded-lg navbar-glass py-4'>
      <div className='navbar-start'>
        <a className='navbar-item'>
          <div className='flex w-full flex-col'>
            <label
              htmlFor='sidebar-mobile-fixed'
              className='sm:hidden cursor-pointer'
            >
              <RxHamburgerMenu />
            </label>
          </div>
        </a>
      </div>
      <div className='navbar-end'>
        <ChatToggle />
      </div>
    </div>
  )
}

export default Header
