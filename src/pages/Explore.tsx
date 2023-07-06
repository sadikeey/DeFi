import MainScreen from './MainScreen'
import OrderPlacementForm from './OrderPlacementForm'

const About: React.FC = () => {
  return (
    <section>
      <div className='w-full items-center max-w-[1200px] min-w-[700px] flex-grow min-h-[600px]'>
        <MainScreen />
      </div>
      <div className='ml-8'>
        <OrderPlacementForm />
      </div>
    </section>
  )
}

export default About
