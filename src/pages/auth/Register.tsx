
import Input from '../../components/share/Input';
import { getEmailUserFormSchema } from '../../validations/user/emailUserFormValidation';
import { useForm, SubmitHandler,FieldValues } from 'react-hook-form';
import { Signup } from '../../api/auth/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: getEmailUserFormSchema() });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const {email,password}=data
    Signup(email, password).then(() => {
      navigate('/')
    })
    
  };

 
 


  return (
    <div className=" min-h-[100%] flex items-center justify-center bg-gray-100">
      <div className="w-[30rem] bg-white h-[18rem] rounded-lg shadow-lg px-8">
        <div className='m-6 flex items-center justify-center font-bold '>회원가입</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            type="email"
            name="email" 
            placeholder="이메일을 입력해주세요"
            errors={errors}
          />
           <Input
            register={register}
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            errors={errors}
          />
          <div className='flex items-center justify-center '>
            <button className='bg-gray-200   p-2 mt-8 rounded-lg text-gray-500' >회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
