import React from "react"
import { Link } from 'react-router-dom'


const Nav = props => {
return (
<nav style={styles.nav}>
	<a href="/">Home</a>
	{props.isLoggedIn && <a href="/logout">Logout</a>}
    </nav>
)
}
export default Nav;

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'center'
    }
}
