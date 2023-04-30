import './App.css';
import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Nav from './components/Nav'
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Header from './components/Header';
import Login from './pages/Login';
import QuizLayout from './pages/QuizLayout';
import queryString from 'querystring';
import axios from 'axios'
import Logout from './pages/Logout';


const App = () => {
  const [token, setToken] = useState('')
  useEffect(() => {
    async function fetchToken() {
      const params = queryString.parse(window.location.search.replace(/^\?/, ''))
      localStorage.token = params.token
      const response = await axios('http://localhost:3000/auth/token/', {
        headers: {
          token: localStorage.token
        }
      })
      setToken(response.data.token)
    }
    fetchToken()
  }, []);

  if (!token) {
    return (
      <div> 
        <div style={styles.headerStyle}>
          <h1 style={styles.h1}>Quizzler</h1>
        </div>
        <Login />
      </div> 
    )
  }

  return (
    <Router>
    <div>
      <Nav isLoggedIn={token ? true : false} />
    </div>
      <div>
        <Header token/>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/quizzes/:id' element={<Quiz />} />
            <Route exact path='/quizlayout' element={<QuizLayout />}/>
            <Route exact path='/logout' element={<Logout />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

const styles = {
  headerStyle: {
      backgroundColor: '#76C4FA',
      marginBottom: '20px'
  },
  h1: {
      padding: '1rem 0',
      textAlign: 'center',
  fontSize: '6rem',
      color: '#000'
}
}
