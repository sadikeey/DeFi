import HeroImg from '../assets/hero-img.png'
import Featured from '../components/Featured'
import Signup from '../components/Signup'

const Home: React.FC = () => {
  return (
    <>
      <section className='relative top-4 mx-auto flex flex-col gap-14 p-8 xl:top-20 xl:max-w-[64vw] xl:flex-row'>
        <div className='flex flex-col gap-8'>
          <article className='flex max-w-[75%] flex-col gap-4'>
            <h1 className='text-4xl font-bold xl:text-6xl'>
              Invest in Cryptocurreny with Your IRA
            </h1>
            <p>
              Empowering Your Financial Future: Intelligent Investments, Informed
              Decisions
            </p>
          </article>
          <div className='flex w-full flex-col items-center gap-4 xl:flex-row'>
            <input
              className='h-10 w-full rounded rounded-br-2xl rounded-tl-2xl border-[1px] border-green-700 p-6 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
              type='email'
              placeholder='Enter you email'
            ></input>
            <button
              type='button'
              className='text-normal w-full rounded rounded-br-2xl rounded-tl-2xl bg-green-700 p-3 font-semibold text-white hover:bg-green-600 hover:text-white'
            >
              Subscribe
            </button>
          </div>
        </div>
        <img src={HeroImg} alt='Hero' className='w-[30rem]' />
      </section>
      <Featured />
      <Signup />
    </>
  )
}

export default Home
