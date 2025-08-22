import logo from "../assets/logo.png"

const HeroSection = () => {
  return (
    <div className='flex flex-col w-full h-[50vh] pt-10 sm:p-4 overflow-x-clip text-center items-center justify-center bg-[#0c0c0c]'>
        <img src={logo} alt="Smart Clause" className="h-[300xpx] w-[250px] m-0 p-0 mb-[-50px]"/>
        <h1 className='font-bold text-[4rem] mt-0 pt-0 text-white'>SmartClause</h1>
        <h2 className='font-medium text-[2rem] text-white'>Understand Contracts Smarter with SmartClause</h2>
        <p className='text-2xl text-white'>AI-powered contract analyzer that flags risky clauses, explains legal jargon, and suggests safer alternatives—instantly.</p>
    </div>
  )
}

export default HeroSection