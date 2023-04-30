import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/QuizLayout";
import queryString from "querystring";
import Login from "./pages/Login"

const App = () => {
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    async function fetchJwt() {
      const params = queryString.parse(
        window.location.search.replace(/^\?/, "")
      );
      console.log(localStorage.token);
      console.log(params.token);
      localStorage.token = params.token;
      console.log(localStorage.token);
      console.log(params.token);
      const response = await axios("http://localhost:3000/auth/token/", {
        headers: {
          token: localStorage.token,
        },
      });
      setJwt(response.data.token);
    }
    fetchJwt();
  }, []);


  if (!jwt) {
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
        <Nav isLoggedIn={jwt ? true : false} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/QuizLayout" element={<Quizzes />} />
            <Route exact path="/quizzes/:id" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

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



