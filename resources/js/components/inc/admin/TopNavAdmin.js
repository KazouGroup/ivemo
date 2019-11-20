import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default class TopNavAdmin extends Component {
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
            <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <form className="navbar-search navbar-search-light form-inline mr-sm-3" id="navbar-search-main">
                            <div className="form-group mb-0">
                                <div className="input-group input-group-alternative input-group-merge">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                    </div>
                                    <input className="form-control" placeholder="Search" type="text"/>
                                </div>
                            </div>
                            <button type="button" className="close" data-action="search-close"
                                    data-target="#navbar-search-main" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </form>

                        <ul className="navbar-nav align-items-center ml-md-auto">
                            <li className="nav-item d-xl-none">

                                <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
                                     data-target="#sidenav-main">
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item d-sm-none">
                                <a className="nav-link" href="#" data-action="search-show"
                                   data-target="#navbar-search-main">
                                    <i className="ni ni-zoom-split-in"></i>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" role="button" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    <i className="ni ni-bell-55"></i>
                                </a>
                                <div
                                    className="dropdown-menu dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden">

                                    <div className="px-3 py-3">
                                        <h6 className="text-sm text-muted m-0">You have <strong
                                            className="text-primary">13</strong> notifications.</h6>
                                    </div>

                                    <div className="list-group list-group-flush">
                                        <a href="#!" className="list-group-item list-group-item-action">
                                            <div className="row align-items-center">
                                                <div className="col-auto">

                                                    <img alt={this.state.first_name}   src={this.state.avatar}
                                                         className="avatar rounded-circle"/>
                                                </div>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">{this.state.first_name}</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>2 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">Let's meet at Starbucks at 11:30.
                                                        Wdyt?</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <a href="#"
                                       className="dropdown-item text-center text-primary font-weight-bold py-3">View
                                        all</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" role="button" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    <i className="ni ni-ungroup"></i>
                                </a>
                                <div
                                    className="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default dropdown-menu-right">
                                    <div className="row shortcuts px-4">
                                        <a href="#" className="col-4 shortcut-item">
                    <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                      <i className="ni ni-calendar-grid-58"></i>
                    </span>
                                            <small>Calendar</small>
                                        </a>
                                        <a href="#" className="col-4 shortcut-item">
                    <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                      <i className="ni ni-email-83"></i>
                    </span>
                                            <small>Email</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                    <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                      <i className="ni ni-credit-card"></i>
                    </span>
                                            <small>Payments</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                    <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                      <i className="ni ni-books"></i>
                    </span>
                                            <small>Reports</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                    <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                      <i className="ni ni-pin-3"></i>
                    </span>
                                            <small>Maps</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                    <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                      <i className="ni ni-basket"></i>
                    </span>
                                            <small>Shop</small>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav align-items-center ml-auto ml-md-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    <div className="media align-items-center">
                                      <span className="avatar avatar-sm rounded-circle">
                                        <img alt={this.state.first_name}   src={this.state.avatar}/>
                                      </span>
                                        <div className="media-body ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm  font-weight-bold">{this.state.first_name}</span>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </div>
                                    <Link to={'/dashboard/profile/'} className="dropdown-item">
                                        <i className="ni ni-single-02"></i>
                                        <span>Profile</span>
                                    </Link>
                                    <Link to={'/dashboard/profile/edit/'} className="dropdown-item">
                                        <i className="ni ni-settings-gear-65"></i>
                                        <span>Settings</span>
                                    </Link>
                                    <a href="#" className="dropdown-item">
                                        <i className="ni ni-calendar-grid-58"></i>
                                        <span>Activity</span>
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        <i className="ni ni-support-16"></i>
                                        <span>Support</span>
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a href="#" className="dropdown-item">
                                        <i className="ni ni-user-run"></i>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
