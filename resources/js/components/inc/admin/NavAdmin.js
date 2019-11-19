import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

export default class NavAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    // get all the tasks from backend
    loadItems() {

        axios.get(`/account/user`).then(response =>
            this.setState({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                avatar: response.data.avatar,
                created_at: response.data.created_at,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        return (
            <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-fixed navbar-shadow navbar-brand-center">
                <div className="navbar-header d-xl-block d-none">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item"><a className="navbar-brand"
                                                    href="#">
                            <div className="brand-logo"></div>
                        </a></li>
                    </ul>
                </div>
                <div className="navbar-wrapper">
                    <div className="navbar-container content">
                        <div className="navbar-collapse" id="navbar-mobile">
                            <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                                <ul className="nav navbar-nav">
                                    <li className="nav-item mobile-menu d-xl-none mr-auto"><a
                                        className="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i className="ficon feather icon-menu"></i></a></li>
                                </ul>
                                <ul className="nav navbar-nav bookmark-icons">
                                    <li className="nav-item d-none d-lg-block">
                                        <a className="nav-link" href="app-todo.html" data-toggle="tooltip"
                                           data-placement="top" title="Todo">
                                            <i className="ficon feather icon-check-square"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item d-none d-lg-block">
                                        <a className="nav-link" href="app-chat.html" data-toggle="tooltip"
                                           data-placement="top" title="Chat">
                                            <i className="ficon feather icon-message-square"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item d-none d-lg-block">
                                        <a className="nav-link" href="app-email.html" data-toggle="tooltip"
                                           data-placement="top" title="Email">
                                            <i className="ficon feather icon-mail"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item d-none d-lg-block">
                                        <a className="nav-link" href="app-calender.html" data-toggle="tooltip"
                                           data-placement="top" title="Calendar">
                                            <i className="ficon feather icon-calendar"></i>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="nav navbar-nav">
                                    <li className="nav-item d-none d-lg-block">
                                        <a className="nav-link bookmark-star">
                                            <i className="ficon feather icon-star warning"></i>
                                        </a>
                                        <div className="bookmark-input search-input">
                                            <div className="bookmark-input-icon"><i
                                                className="feather icon-search primary"></i></div>
                                            <input className="form-control input" type="text"
                                                   placeholder="Explore Vuexy..." tabIndex="0"
                                                   data-search="template-list"/>
                                            <ul className="search-list search-list-bookmark"></ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul className="nav navbar-nav float-right">
                                <li className="dropdown dropdown-language nav-item"><a
                                    className="dropdown-toggle nav-link" id="dropdown-flag" href="#"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                                    className="flag-icon flag-icon-us"></i><span
                                    className="selected-language">English</span></a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown-flag"><a
                                        className="dropdown-item" href="#" data-language="en"><i
                                        className="flag-icon flag-icon-us"></i> English</a><a className="dropdown-item"
                                                                                              href="#"
                                                                                              data-language="fr"><i
                                        className="flag-icon flag-icon-fr"></i> French</a><a className="dropdown-item"
                                                                                             href="#"
                                                                                             data-language="de"><i
                                        className="flag-icon flag-icon-de"></i> German</a><a className="dropdown-item"
                                                                                             href="#"
                                                                                             data-language="pt"><i
                                        className="flag-icon flag-icon-pt"></i> Portuguese</a></div>
                                </li>
                                <li className="nav-item d-none d-lg-block"><a className="nav-link nav-link-expand"><i
                                    className="ficon feather icon-maximize"></i></a></li>
                                <li className="nav-item nav-search"><a className="nav-link nav-link-search"><i
                                    className="ficon feather icon-search"></i></a>
                                    <div className="search-input">
                                        <div className="search-input-icon"><i
                                            className="feather icon-search primary"></i></div>
                                        <input className="input" type="text" placeholder="Explore Vuexy..."
                                               tabIndex="-1" data-search="template-list"/>
                                        <div className="search-input-close"><i className="feather icon-x"></i></div>
                                        <ul className="search-list search-list-main"></ul>
                                    </div>
                                </li>
                                <li className="dropdown dropdown-notification nav-item"><a
                                    className="nav-link nav-link-label" href="#" data-toggle="dropdown"><i className="ficon feather icon-bell">

                                </i><span
                                    className="badge badge-pill badge-primary badge-up">5</span></a>
                                    <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                        <li className="dropdown-menu-header">
                                            <div className="dropdown-header m-0 p-2">
                                                <h3 className="white">5 New</h3><span className="notification-title">App Notifications</span>
                                            </div>
                                        </li>
                                        <li className="scrollable-container media-list"><a
                                            className="d-flex justify-content-between" href="#">
                                            <div className="media d-flex align-items-start">
                                                <div className="media-left"><i className="feather icon-plus-square font-medium-5 primary">

                                                </i>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="primary media-heading">You have new order!</h6><small
                                                    className="notification-text"> Are your going to meet me
                                                    tonight?</small>
                                                </div>
                                                <small>
                                                    <time className="media-meta" dateTime="2015-06-11T18:29:20+08:00">9
                                                        hours ago
                                                    </time>
                                                </small>
                                            </div>
                                        </a><a className="d-flex justify-content-between" href="#">
                                            <div className="media d-flex align-items-start">
                                                <div className="media-left"><i className="feather icon-download-cloud font-medium-5 success">

                                                </i>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="success media-heading red darken-1">99% Server
                                                        load</h6><small className="notification-text">You got new order
                                                    of goods.</small>
                                                </div>
                                                <small>
                                                    <time className="media-meta" dateTime="2015-06-11T18:29:20+08:00">5
                                                        hour ago
                                                    </time>
                                                </small>
                                            </div>
                                        </a><a className="d-flex justify-content-between" href="#">
                                            <div className="media d-flex align-items-start">
                                                <div className="media-left"><i className="feather icon-alert-triangle font-medium-5 danger">

                                                </i>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="danger media-heading yellow darken-3">Warning
                                                        notifixation</h6><small className="notification-text">Server
                                                    have 99% CPU usage.</small>
                                                </div>
                                                <small>
                                                    <time className="media-meta"
                                                          dateTime="2015-06-11T18:29:20+08:00">Today
                                                    </time>
                                                </small>
                                            </div>
                                        </a><a className="d-flex justify-content-between" href="#">
                                            <div className="media d-flex align-items-start">
                                                <div className="media-left"><i className="feather icon-check-circle font-medium-5 info">

                                                </i></div>
                                                <div className="media-body">
                                                    <h6 className="info media-heading">Complete the task</h6><small
                                                    className="notification-text">Cake sesame snaps cupcake</small>
                                                </div>
                                                <small>
                                                    <time className="media-meta"
                                                          dateTime="2015-06-11T18:29:20+08:00">Last week
                                                    </time>
                                                </small>
                                            </div>
                                        </a><a className="d-flex justify-content-between" href="#">
                                            <div className="media d-flex align-items-start">
                                                <div className="media-left">
                                                    <i className="feather icon-file font-medium-5 warning">

                                                    </i></div>
                                                <div className="media-body">
                                                    <h6 className="warning media-heading">Generate monthly report</h6>
                                                    <small className="notification-text">Chocolate cake oat cake
                                                        tiramisu marzipan</small>
                                                </div>
                                                <small>
                                                    <time className="media-meta"
                                                          dateTime="2015-06-11T18:29:20+08:00">Last month
                                                    </time>
                                                </small>
                                            </div>
                                        </a></li>
                                        <li className="dropdown-menu-footer"><a
                                            className="dropdown-item p-1 text-center" href="#">Read all
                                            notifications</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown dropdown-user nav-item"><a
                                    className="dropdown-toggle nav-link dropdown-user-link" href="#"
                                    data-toggle="dropdown">
                                    <div className="user-nav d-sm-flex d-none">
                                        <span className="user-name text-bold-600">{this.state.first_name} </span>
                                        <span className="user-status">Available</span>
                                    </div>
                                    <span>
                                <img className="round"
                                     src={this.state.avatar}
                                     alt={this.state.first_name}  height="40" width="40"/>
                            </span>
                                </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="page-user-profile.html">
                                            <i className="feather icon-user">

                                            </i> Edit Profile
                                        </a>
                                        <a className="dropdown-item" href="app-email.html">
                                            <i className="feather icon-mail">

                                            </i> My Inbox
                                        </a>
                                        <a className="dropdown-item" href="app-todo.html">
                                            <i className="feather icon-check-square">

                                            </i> Task
                                        </a>
                                        <a className="dropdown-item" href="app-chat.html">
                                            <i className="feather icon-message-square">

                                            </i> Chats
                                        </a>
                                        <div className="dropdown-divider">

                                        </div>
                                        <a className="dropdown-item" href="auth-login.html">
                                            <i className="feather icon-power">

                                            </i> Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
