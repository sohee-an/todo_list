import { Outlet } from 'react-router-dom';


const AuthLayout = () => {
 
  return (
    <div className="flex min-h-screen">
     
      <main className="flex-grow p-4 bg-gray-100">
       <Outlet/>
      </main>
    </div>
  );
};

export default AuthLayout;