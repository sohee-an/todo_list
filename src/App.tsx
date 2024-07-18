import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import MyTodo from './pages/MyTodo';
import Login from './pages/auth/Login';
import { app } from './config/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

function App() {
  const db = getDatabase(app);
  console.log('app', db);
  useEffect(() => {
    // 데이터베이스에서 데이터 읽기
    async function fetchData() {
      const dbRef = ref(db, '/uers/1'); // 데이터를 읽어올 경로 설정
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error getting data:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my" element={<MyTodo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
