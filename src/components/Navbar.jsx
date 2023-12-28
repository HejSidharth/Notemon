import React from 'react'
import ThemeToggle from './ThemeToggle'
import { SignInButton, SignUpButton, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
 // ========== HEADER ==========
 <>
<header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-3 sm:py-0 ">
  <nav className="navbar relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
    <div className="flex items-center justify-between">
      <a className="flex-none text-xl font-semibold btn btn-ghost" href="#" aria-label="Notemon">Notemon</a>
    </div>
    <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
      <div className="flex flex-col gap-y-4 gap-x-0 mt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
        <ul className='menu menu-horizontal sm:py-6'>
        <li><ThemeToggle /></li>
        <SignedOut>
        <li>    
        <a className="flex items-center font-semibold btn-ghost" href="#">
        <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <SignInButton />
        </a>
        </li>
        <li>    
        <a className="flex items-center font-semibold btn-ghost" href="#">
        <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <SignUpButton />
        </a>
        </li>
        </SignedOut>
        <li>
        <UserButton />
        </li>
      </ul>
      </div>
    </div>
  </nav>
</header>
  </>
)
}
