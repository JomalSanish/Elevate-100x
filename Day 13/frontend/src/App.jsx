import { useState } from 'react'
import myImage from './assets/IMG_20250628_181859.jpg';

function App() {
  return (
    <div className="bg-gray-950 flex justify-center min-h-screen p-10">
      <div className='pr-10'>
      <h1 className="text-white text-3xl font-bold">Hi, I'm Jomal 👻 </h1>
      <h3 className="text-white">Tech enthusiast, petrolhead, future entrepreneur.</h3>
      <div className='flex justify-between'></div>
      <h6 className=" bg-gray-600 text-white">Kannur, India
      </h6>
      <h6 className=" bg-gray-600 text-white">some time
      </h6>
      <h6 className=" bg-gray-600 text-white">resume
      </h6>
      </div>
      <img className=' w-30 h-30 rounded-4xl' src={myImage}/>
    </div>
  )
}

export default App
