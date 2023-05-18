import { Link } from 'react-router-dom'

interface ILogoProps {
  className?: string
}

const Logo: React.FC<ILogoProps> = ({className}) => {
  return (
    <Link className={`font-bold ${className}`} to='/#main'>
      <span className='black'>
        De
      </span>
      <span className='text-green-600'>
        Fi
      </span>
    </Link>
  )
}

export default Logo
