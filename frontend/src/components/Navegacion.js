import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';

export default class Navegacion extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link active" to="#">Inicio <span className="sr-only">(current)</span></NavLink>
                        <NavLink className="nav-item nav-link" to="/productos">Productos</NavLink>
                        <NavLink className="nav-item nav-link" to="#">Compras</NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}