import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class  FooterAdmin extends  Component {
    render() {
        return (
            <footer className="footer pt-0">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6">
                        <div className="copyright text-center text-lg-left text-muted">
                            &copy; 2019 <a href="#" className="font-weight-bold ml-1" target="_blank">Ivemo</a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a href="#" target="_blank">KazouGroup</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" target="_blank">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" target="_blank">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" target="_blank">License</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}
export default FooterAdmin;
