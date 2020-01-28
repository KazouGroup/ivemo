import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class  FooterAdmin extends  Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <nav className="float-left">
                        <ul>
                            <li>
                                <Link to={'/dashboard'}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <a href="https://creative-tim.com/presentation">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <Link to={'/dashboard/faqs/v1/all'}>
                                    Faqs
                                </Link>
                            </li>
                            <li>
                                <a href="http://blog.creative-tim.com">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="https://www.creative-tim.com/license">
                                    Licenses
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright float-right">
                        &copy;
                        <script>
                            document.write(new Date().getFullYear())
                        </script>
                        <i className="material-icons text-danger">favorite</i> by
                        <a href="/dashboard" target="_blank"> KazouGroup</a> for a better web.
                    </div>
                </div>
            </footer>
        );
    }
}
export default FooterAdmin;
