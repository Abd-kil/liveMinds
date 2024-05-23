import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthProvider';
import Login from './pages/login/Login';
import ProfessorHome from './pages/home/ProfessorHome';
import StudentHome from './pages/home/StudentHome';
import Navbar from './components/navbar/Navbar';
import { ColorModeProvider } from './context/ThemeContext';
import { HashRouter, Route, Routes } from 'react-router-dom';
const Routing = (props: any) => {
  return (
    <HashRouter basename='/'>
      <Navbar>
        <Routes>
          <Route path='/' element={props.role === 'professor' ? <ProfessorHome /> : <StudentHome />} />
        </Routes>
      </Navbar>
    </HashRouter>
  )
}
const App = () => {
  const { auth } = useAuth();
  const [role, setRole] = useState('');
  useEffect(() => {
    if (auth.isLoggedIn && auth.user?.role == 'Student') setRole('student');
    else if (auth.isLoggedIn && auth.user?.role == 'Professor') setRole('professor');
    else setRole('');
    console.log(auth.isLoggedIn && auth.user?.role + role);
  }, [auth.isLoggedIn])
  return (
    <ColorModeProvider>
      {
        role !== '' ?
          <Routing role={role} /> :
          <Login />
      }
    </ColorModeProvider>
  );
}

export default App;
