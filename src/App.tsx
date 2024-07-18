import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import MyTodo from './pages/MyTodo';
import Login from './pages/auth/Login';
import { app,auth } from './config/firebase'


import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import Register from './pages/auth/Register';




function App() {
  const db = getDatabase(app);
  const[isLoading,setIsLoading]=useState(false)
  
    const init = async () => {

    await auth.authStateReady();
    setIsLoading(false);
  };
  
  useEffect(() => {
    init();
  }, []);
 
  return (
    <BrowserRouter>
    <Routes>
     <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<MyTodo />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
