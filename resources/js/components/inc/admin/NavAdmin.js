import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

export default class NavAdmin extends Component {
    render() {
        return (
            <nav className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
                 id="sidenav-main">
                <div className="scrollbar-inner">

                    <div className="sidenav-header d-flex align-items-center">
                        <a className="navbar-brand" href="#">
                            <img src="../../assets/img/brand/blue.png" className="navbar-brand-img" alt="Ivemo"/>
                        </a>
                        <div className="ml-auto">

                            <div className="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin"
                                 data-target="#sidenav-main">
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-inner">

                        <div className="collapse navbar-collapse" id="sidenav-collapse-main">

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="ni ni-shop text-primary"></i>
                                        <span className="nav-link-text">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="ni ni-archive-2 text-green"></i>
                                        <span className="nav-link-text">Widgets</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="ni ni-chart-pie-35 text-info"></i>
                                        <span className="nav-link-text">Charts</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="ni ni-calendar-grid-58 text-red"></i>
                                        <span className="nav-link-text">Calendar</span>
                                    </a>
                                </li>
                            </ul>


                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
