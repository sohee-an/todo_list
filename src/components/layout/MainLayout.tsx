import  { useState, } from 'react';
import { Outlet } from 'react-router-dom';




const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <nav className={`bg-gray-800 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} min-h-screen flex flex-col transition-all duration-300`}>
        <div className="flex-shrink-0 mb-4 p-4 cursor-pointer" onClick={toggleSidebar}>
          <h1 className={`text-2xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>My App</h1>
          <svg className={`w-8 h-8 ${isSidebarOpen ? 'hidden' : 'block'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
        <ul className="flex-grow">
          <li className="mb-2">
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-700">홈</a>
          </li>
          <li className="mb-2">
            <a href="/my" className="block px-4 py-2 rounded hover:bg-gray-700">내 할일</a>
          </li>
        </ul>
        <div className="flex-shrink-0 p-4">
          <a href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">Settings</a>
        </div>
      </nav>
      <main className="flex-grow p-4 bg-gray-100">
        <Outlet/>
      </main>
    </div>
  );
};

export default MainLayout;
