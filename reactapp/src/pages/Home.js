import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queryString from 'querystring'

const Quizhome = () => {
	const [quizzes, setQuizzes] = useState([])
	useEffect(() => {
		async function fetchQuizzes() {
			const params = queryString.parse(window.location.search.replace(/^\?/, ''))
			const response = await axios('http://localhost:3000/quizzes', {
        headers: {
          token: localStorage.token
        }
      })
	  		setQuizzes(response.data)
		}
		fetchQuizzes()
	}, []);
	return (
		<div>
			<h2>Take a Quiz!</h2>
			<h3>Click on any quiz listed below to take one.</h3>
			<ul>
				{quizzes.map(q => (
					<li>
						<a href={'/quizzes/' + q.id}>{q.name}</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Quizhome
