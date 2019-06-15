import React, { Component } from "react";
import logo from "../ICONS/icon.png";
import "../CSS/Header.css";
import "../CSS/header-responsive.css";
import { NavLink } from "react-router-dom";
import Logout from './Logout.js';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            components: []
        };
    }

    componentDidMount() {
        this.setState({
            components: this.props.components
        });
    }

    render() {
        const element = <div className="App-header">
            <NavLink to="/Home">
                <div className="container-for-logo">
                    <img  src={logo} className="App-logo" alt="logo" />
                    <span className="Header-text">MovieBuffs</span>
                </div>
            </NavLink>
            <div className="header-nav-link header-containts-container">
                {(this.state.components.user) ? (
                    <div className="nav-link hearder-containt-text" >
                        <div className="dropdown">
                            <span > <span className="hello-text-desktop">Hello {JSON.parse(localStorage.sessionDetails).user_name}</span>
                                <i className="fas fa-user-circle user-profile-mobile"></i>
                                <i className="fas fa-caret-down drop-down-arrow"></i>
                            </span>
                            <div className="dropdown-content">
                                <NavLink to='/dashboard'>Dashboard</NavLink>
                                <Logout />
                            </div>
                        </div>
                    </div>
                ) : (<div></div>)}
                {(this.state.components.browseMovies) ? (
                    <NavLink className="nav-link hearder-containt-text" to="/search">
                        <span className="browes-movies-desktop"> Browse movies </span>
                        <i className="fas fa-search browes-movies-mobile"></i>
                    </NavLink>
                ) : (<div></div>)}
            </div>
        </div>
        return element
    }
}
