import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleClickBackButton = () => {
        navigate(-1)
    }
  return (
    <div className='p-4 '>
      <h1 className='m-2 text-xl font-bold'>예상치 못한 에러가 발생했습니다.</h1>
          <button className='m-2 border border-gray-500 border-solid p-2 rounded-lg' onClick={handleClickBackButton}>뒤로</button>
    </div>
  )
}

export default ErrorPage
