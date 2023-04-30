import React from 'react'
//import Nav from '../components/Nav'

const Login = () => {
		return (
			<div>
				<div style={styles.login}>
					<h2>Login</h2>
					<h3>Please login to get started: </h3>
					<a href="https://github.com/login/oauth/authorize?client_id=f2654a86ce4959d77cec">Login With Github</a>
				</div>
			</div>
		)
}

export default Login;

const styles = {
	login: {
		textAlign: 'center'
	}
}