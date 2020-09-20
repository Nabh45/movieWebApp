import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

    constructor() {
        super()
        this.state = {activeLink: 'home'}
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick(navLink) {
        this.setState({activeLink: navLink == '/' ? 'home': 'favouriteList'})
    }
    
    render() {
        const { activeLink } = this.state;
        return (
            <div className='nav-bar-outer'>
                <ul className='top-nav-ul'>
                    <Link onClick={()=>this.handleMenuClick('/')} className={activeLink == 'home' ? "nav-item-left active" : "nav-item-left"}  to="/">Home</Link>
                    <Link onClick={()=>this.handleMenuClick('favouriteList')} className={activeLink == 'favouriteList' ? "nav-item-right active" : "nav-item-right"}  to="/favouriteList">Favourite</Link>
                </ul>
            </div>
        )
    }
}

export default Navbar