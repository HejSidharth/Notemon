import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './pages/Home'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import Subpage from './pages/subpages/Subpage'
import About from './pages/subpages/About'
import NewNote from './pages/subpages/NewNote'
import Table from './pages/subpages/Table'
import NewCodeshot from './pages/subpages/NewCodeshot'
import CodeShotPage from './pages/subpages/CodeDisplay'
import { Toaster } from 'react-hot-toast'
import NoteDisplay from './pages/subpages/NoteDisplay'


export default function App() {
  const user = useUser();
  const userId = user?.user?.id;
useEffect(() => {
    localStorage.setItem('userId', userId);
}, [userId]);
if (navigator.onLine) {
  console.log("Online");
} else {
  console.log("Offline");
}
  return (
    <BrowserRouter>
    <Toaster />
    <Navbar />
    <Routes>
      {/*Home Route*/}
      <Route path="/" element={<HeroSection/>}></Route>
      {/*About Route*/}
      <Route path="/about" element={<Subpage/>}></Route>
      {/*404 Route*/}
      <Route path="/b" element={<About/>}></Route>
      <Route path="/note" element={<NewNote/>}></Route>
      <Route path="/dashboard" element={<Table/>}></Route>
      <Route path="/codeshot-creation" element={<NewCodeshot/>}></Route>
      <Route path="/codeshot/:id" element={<CodeShotPage />} />
      <Route path="/note/:id" element={<NoteDisplay />} />

    </Routes>
    </BrowserRouter>
)
}