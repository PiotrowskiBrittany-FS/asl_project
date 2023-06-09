import React from 'react'
import Navigation from "./Nav"



const Header = props => {
	console.log(props.token)
		return (
			<header>
				<div style={styles.header}>
					<h1 style={styles.h1}>Quzzler</h1>
					<Navigation isLoggedIn={props.token ? true : false} />
				</div>
			</header>
		);

}

export default Header;

const styles = {
    header: {
        backgroundColor: '#76C4FA',
        marginBottom: '20px'
    },
    h1: {
        padding: '1rem 0',
        textAlign: 'center',
		fontSize: '5rem',
      	color: '#000'
	}
}