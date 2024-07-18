import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import MyTodo from './pages/MyTodo';
import Login from './pages/auth/Login';
import { app,auth } from './config/firebase'
import { doc, getDoc } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import Register from './pages/auth/Register';

function App() {
  const db = getDatabase(app);
  const[isLoading,setIsLoading]=useState(false)
  
    const init = async () => {
    // 최초 인증 상태가 완료될 때 실행되는 Promise를 return
    // Firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인 여부를 확인하는 동안 기다림
    await auth.authStateReady();
    setIsLoading(false);
  };
  
  useEffect(() => {
    init();
  }, []);
 
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my" element={<MyTodo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
