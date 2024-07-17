import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import MyTodo from './pages/MyTodo';



function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<MyTodo/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
