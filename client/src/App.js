import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';

import Error from './pages/Error'
import { useAuth } from './pages/AuthContext';


function App() {
  const { user } = useAuth();
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
