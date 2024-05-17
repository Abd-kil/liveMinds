import { useEffect, useState } from 'react';
import './App.css';
import { useAuth } from './context/AuthProvider';
import Login from './pages/login/Login';
import axios from './api/axios';
import ProfessorHome from './pages/home/ProfessorHome';
import StudentHome from './pages/home/StudentHome';

function App() {
  const { auth } = useAuth();
  const [role, setRole] = useState('');
  useEffect(() => {
    if (auth.isLoggedIn && auth.user?.role == 'Student') setRole('student');
    else if (auth.isLoggedIn && auth.user?.role == 'Professor') setRole('professor');
    else setRole('');
    console.log(auth.isLoggedIn && auth.user?.role + role);
  }, [auth.isLoggedIn])
  return (
    <>
      {
        role === 'student' ?
          <StudentHome/> :
          role == 'professor' ?
            <ProfessorHome/>:
            <Login />
      }
    </>
  );
}

export default App;
