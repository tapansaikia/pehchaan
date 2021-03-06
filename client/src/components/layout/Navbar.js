import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                        Post Feed
          </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/event">
                        Create Event
          </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://pehchaanec.herokuapp.com/">
                        Equipments
          </a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
          </Link>
                </li>
                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        Logout
          </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
          </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
          </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4" style={{ zIndex: "5" }}>
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        PehChaan
          </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">
                                    {' '}
                                    Users
                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/schemes">
                                    {' '}
                                    Schemes
                </Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
    Navbar
);
