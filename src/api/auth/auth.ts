import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';


export const Signup = async (email: string, password: string) => {
  try {
   
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);
   
    
  } catch (error) {
    console.error(error);
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    const userId = userCredential.user.uid;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    
   
    
  } catch (error) {
    alert('비밀번호 혹은 아이디가 틀립니다.');
    console.error('Error logging in:', error);
  }
};
