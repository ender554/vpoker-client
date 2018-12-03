import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  render() {
    if (!this.props.auth.authToken) {
      return (
        <header>
          <nav className="main-nav">
            <ul>
              <li><Link to="/"><img className="logo" src={'/images/pcalcclean.png'} alt="logo-pcalc"/></Link></li>
              <li className="logIn"><Link to='/login'> Log In! </Link></li>
            </ul>
          </nav >
        </header>);
    }
    else {
      return (
        <header>
          <nav className="main-nav">
            <ul>
              <li><Link to="/"><img className="logo" src={'/images/pcalcclean.png'} alt="logo-pcalc"/> </Link></li>
              <li className="logIn"><Link to='/logout'> Log out! </Link></li>
            </ul>
          </nav >
        </header>);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    cards: state.game.cards,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Navbar);