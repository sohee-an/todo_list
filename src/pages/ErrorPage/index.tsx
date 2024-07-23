import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleClickBackButton = () => {
        navigate(-1)
    }
  return (
    <div>
          <h1>예상치 못한 에러가 발생했습니다.</h1>
          <button onClick={handleClickBackButton}> 뒤로</button>
    </div>
  )
}

export default ErrorPage
