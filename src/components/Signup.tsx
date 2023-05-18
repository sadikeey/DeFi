import CryptoMobile from '../assets/trade.png'

const Signup = () => {
  return (
    <div className='w-[100vw]'>
      <section
        id='signup'
        className='mx-auto flex flex-col gap-4 max-w-[94vw] xl:max-w-[64vw] xl:flex-row xl:py-20 justify-between items-center'
      >
        <img className='xl:w-[22rem] w-[100%] mx-auto xl:pl-10' src={CryptoMobile} alt='crypto-mobile' />
        <article id='right' className='flex flex-col gap-4 xl:w-[50%] px-6 xl:px-0'>
          <h2 className='text-5xl font-bold'>
            Earn passive income with crypto.
          </h2>
          <p>
            Earn up to 12% annual rewards on 30+ digital assets. Simply hold
            your assets in the app to automatically earn rewards at the end of
            each month with no lockups and no limits.
          </p>
          <div className='flex w-full flex-col items-center gap-4 xl:flex-row'>
            <input
              className='h-10 w-full rounded rounded-br-2xl rounded-tl-2xl border-[1px] border-green-700 p-6 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
              type='email'
              placeholder='Enter you email'
            ></input>
            <button
              type='button'
              className='text-normal w-full rounded rounded-br-2xl rounded-tl-2xl bg-green-700 p-3 font-semibold text-white hover:bg-green-600 hover:text-white'
            >Learn More</button>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Signup
