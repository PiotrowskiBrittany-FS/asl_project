import React from "react"
import { Link } from 'react-router-dom'


class Nav extends React.Component {
    render(){
        return (
            <nav style={styles.nav}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {this.props.isLoggedIn && <li><Link to="/logout">Logout</Link></li>}
                </ul>
            </nav>
        )
    }
}
export default Nav;

const styles = {
    nav: {
        color: '#000',
        display: 'flex',
        justifyContent: 'center'
    }
}
