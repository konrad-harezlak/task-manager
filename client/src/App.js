import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Error from './pages/Error';
import { useAuth } from './pages/AuthContext';

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"></link>
function App() {
  const { user } = useAuth();
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={user ? <Home /> : <Login />} />
          <Route path='/registration' element={user ? <Home /> : <Registration />} />
          <Route path='/home' element={user ? <Home /> : <Login />} />
          <Route path='/admin_panel' element={user && user.role==="admin" ? <Admin /> : <Login />}/>
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
