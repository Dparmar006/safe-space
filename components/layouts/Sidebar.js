'use client'

import React, { useEffect, useState } from 'react'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Avatar from '../user/Avatar'
const Sidebar = () => {
  const session = useSession()
  const loggedinUser = session?.data?.user
  const [providers, setProviders] = useState(null)

  const setupProviders = async () => {
    try {
      const response = await getProviders()
      setProviders(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setupProviders()
  }, [])

  return (
    <>
      <input
        type='checkbox'
        id='sidebar-mobile-fixed'
        className='sidebar-state'
      />
      <label htmlFor='sidebar-mobile-fixed' className='sidebar-overlay'></label>
      <aside className='sidebar sidebar-mobile h-[100dvh] max-h-screen justify-start max-sm:fixed max-sm:-translate-x-full'>
        <Link href='/'>
          <section className='sidebar-title items-center p-4'>
            <svg
              fill='none'
              height='42'
              viewBox='0 0 32 32'
              width='42'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect height='100%' rx='16' width='100%'></rect>
              <path
                clipRule='evenodd'
                d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
                fill='currentColor'
                fillRule='evenodd'
              ></path>
            </svg>
            <div className='flex flex-col'>
              <span>Untold</span>
              <span className='text-xs font-normal text-content2'>
                The safe-space
              </span>
            </div>
          </section>
        </Link>

        <section className='sidebar-content'>
          <nav className='menu rounded-md'>
            <section className='menu-section px-4'>
              <span className='menu-title'>Main menu</span>
              <ul className='menu-items'>
                <Link href='/' className='menu-item menu-active'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 opacity-75'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  <span>Home</span>
                </Link>
              </ul>
            </section>
            <div className='divider my-0'></div>
            {/* <section className='menu-section px-4'>
              <span className='menu-title'>Settings</span>
              <ul className='menu-items'>
                <li className='menu-item'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='opacity-75'
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M3 21l18 0'></path>
                    <path d='M3 10l18 0'></path>
                    <path d='M5 6l7 -3l7 3'></path>
                    <path d='M4 10l0 11'></path>
                    <path d='M20 10l0 11'></path>
                    <path d='M8 14l0 3'></path>
                    <path d='M12 14l0 3'></path>
                    <path d='M16 14l0 3'></path>
                  </svg>
                  Payments
                </li>
                <li className='menu-item'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='opacity-75'
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z'></path>
                    <path d='M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
                    <path d='M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2'></path>
                  </svg>
                  Balances
                </li>
                <li className='menu-item'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='opacity-75'
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0'></path>
                    <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
                    <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                    <path d='M21 21v-2a4 4 0 0 0 -3 -3.85'></path>
                  </svg>
                  Customers
                </li>
                <li className='menu-item'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='opacity-75'
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M7 10l5 -6l5 6'></path>
                    <path d='M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z'></path>
                    <path d='M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
                  </svg>
                  Products
                </li>
                <li>
                  <input type='checkbox' id='menu-2' className='menu-toggle' />
                  <label className='menu-item justify-between' htmlFor='menu-2'>
                    <div className='flex gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='opacity-75'
                        width='22'
                        height='22'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path
                          stroke='none'
                          d='M0 0h24v24H0z'
                          fill='none'
                        ></path>
                        <path d='M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11'></path>
                        <path d='M9 7l4 0'></path>
                        <path d='M9 11l4 0'></path>
                      </svg>
                      <span>Contracts</span>
                    </div>


                    <span className='menu-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  </label>


                  <div className='menu-item-collapse'>
                    <div className='min-h-0'>
                      <label className='menu-item menu-item-disabled ml-6'>
                        Create contract
                      </label>
                      <label className='menu-item ml-6'>All contracts</label>
                      <label className='menu-item ml-6'>
                        Pending contracts
                      </label>
                      <label className='menu-item ml-6'>Security</label>
                    </div>
                  </div>
                </li>
              </ul>
            </section> */}
          </nav>
        </section>
        <section className='sidebar-footer justify-end bg-gray-2 pt-2'>
          <div className='divider my-0'></div>
          {loggedinUser ? (
            <div className='dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4'>
              <label
                className='whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4'
                tabIndex={0}
              >
                <div className='flex flex-row gap-4 p-4'>
                  <Avatar
                    image={loggedinUser?.image}
                    username={loggedinUser?.email}
                  />

                  <div className='flex flex-col'>
                    <span>{loggedinUser.name}</span>
                  </div>
                </div>
              </label>
              <div className='dropdown-menu-right-top dropdown-menu ml-2'>
                <a className='dropdown-item text-sm'>Profile</a>
                <button
                  onClick={signOut}
                  tabIndex={-1}
                  className='dropdown-item text-sm'
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <button
              key={providers?.google?.name}
              type='button'
              onClick={() => signIn(providers?.google?.id)}
              className='btn gap-2 bg-gray-5 m-2'
            >
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                version='1.1'
                viewBox='0 0 48 48'
                enableBackground='new 0 0 48 48'
                className='h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='#FFC107'
                  d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                ></path>
                <path
                  fill='#FF3D00'
                  d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                ></path>
                <path
                  fill='#4CAF50'
                  d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                ></path>
                <path
                  fill='#1976D2'
                  d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                ></path>
              </svg>
              <span>Sign up with google</span>
            </button>
          )}
        </section>
      </aside>
    </>
  )
}

export default Sidebar
