
import './App.css'
import FileUploader from './Components/FileUploader'
import HeroSection from './Components/HeroSection'
// import Hero from "./Components/Hero.jsx"

function App() {


  return (
    <div className='w-full min-h-screen flex bg-[#0c0c0c] overflow-hidden overflow-x-clip flex-col'>
      <HeroSection/>
      <FileUploader/>
    </div>
  )
}

export default App
