"use client"
import {React,useState} from 'react'
import EditPannel from '@/components/EditPannel';

function Admin() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const HandleSubmit = (e) => {
      e.preventDefault();
  
      // Check if the entered credentials are correct
      if (userName === 'SuffaMehfil23``' && password === '1212SuMehfilTTT') {
        // Open a new window or redirect to the desired page
        // window.open('/panel', '_blank');
        setLoggedIn(true);
      } else {
        // Show an alert for invalid credentials
        alert('Invalid username or password');
      }
    };
  
  
  return (
    <div > 
    {!loggedIn ? <div className="flex flex-col items-center justify-center h-screen">
    <div className='mx-auto flex flex-col p-14 text-center'>
        <h1 className='text-xl font-medium '>Suffa Mehfil&apos;23</h1>
        <h2 className='text-lg'>Admin Panel</h2>
    </div>
      <form onSubmit={HandleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-lg">Username</label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded-md"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-lg">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-lg font-bold text-white bg-teal-900 rounded-md hover:bg-teal-950"
        >
          Login
        </button>
      </form>
    </div> :
    
    // Log in Interface
    <EditPannel/>}
    


    </div>
  )
}

export default Admin
