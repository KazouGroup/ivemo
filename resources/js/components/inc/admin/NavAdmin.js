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
            <div className="sidebar" data-color="rose" data-background-color="black"
                 data-image="/assets/dashboard/assets/img/sidebar-1.jpg">
                <div className="logo">
                    <a href="http://www.creative-tim.com" className="simple-text logo-mini">
                        IV
                    </a>
                    <a href="http://www.creative-tim.com" className="simple-text logo-normal">
                        Ivemo
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <div className="user">
                        <div className="photo">
                            <img src={this.state.avatar}/>
                        </div>
                        <div className="user-info">
                            <a data-toggle="collapse" href="#collapseExample" className="username">
                              <span>
                                  {this.state.first_name} {this.state.last_name}
                                <b className="caret"></b>
                              </span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/dashboard/profile/'}>
                                            <span className="sidebar-mini"> MP </span>
                                            <span className="sidebar-normal"> My Profile </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/dashboard/profile/edit/'}>
                                            <span className="sidebar-mini"> EP </span>
                                            <span className="sidebar-normal"> Edit Profile </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/dashboard/'}>
                                            <span className="sidebar-mini"> S </span>
                                            <span className="sidebar-normal"> Settings </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <span className="sidebar-mini"><b>CL</b></span>
                                            <span className="sidebar-normal"><b>Member since: {moment(this.state.created_at).format('DD/MM/YYYY')}</b>
								            </span>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" id="btnShowAlertLogout" >
                                            <span className="sidebar-mini"><b>L</b></span>
                                            <span className="sidebar-normal"><b>Logout</b></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/dashboard/'}>
                                <i className="material-icons">dashboard</i>
                                <p> Dashboard </p>
                            </NavLink>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" data-toggle="collapse" href="#pagesExamples">
                                <i className="material-icons">image</i>
                                <p> Pages
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse" id="pagesExamples">
                                <ul className="nav">
                                    <li  className="nav-item ">
                                        <a className="nav-link" data-toggle="collapse" href="#aidesFaqs">
                                            <span className="sidebar-mini"><b>FQ</b></span>
                                            <span className="sidebar-normal"><b>FAQS</b>
                                          <b className="caret"></b>
                                        </span>
                                        </a>
                                        <div className="collapse" id="aidesFaqs">
                                            <ul className="nav">
                                                <li className="nav-item ">
                                                    <Link className="nav-link" to={'/dashboard/faqs/'}>
                                                        <span className="sidebar-mini"> FQ </span>
                                                        <span className="sidebar-normal"> FAQS </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item ">
                                        <Link to={'/dashboard/links/'} className="nav-link">
                                            <span className="sidebar-mini"> LK </span>
                                            <span className="sidebar-normal"> Links </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" data-toggle="collapse" href="#pagesAdministration">
                                <i className="material-icons">info</i>
                                <p> Dashboard
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse" id="pagesAdministration">
                                <ul className="nav">
                                    <li  className="nav-item ">
                                        <a className="nav-link" data-toggle="collapse" href="#aidesUsers">
                                            <span className="sidebar-mini"><b>UR</b></span>
                                            <span className="sidebar-normal"><b>Users</b>
                                          <b className="caret"></b>
                                        </span>
                                        </a>
                                        <div className="collapse" id="aidesUsers">
                                            <ul className="nav">
                                                <li className="nav-item ">
                                                    <Link className="nav-link" to={'/dashboard/users/'}>
                                                        <span className="sidebar-mini"> UR </span>
                                                        <span className="sidebar-normal"> Users </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/dashboard/administrators/'}>
                                            <span className="sidebar-mini"> AM </span>
                                            <span className="sidebar-normal"> Administrators </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/dashboard/permissions/'}>
                                            <span className="sidebar-mini"> PM </span>
                                            <span className="sidebar-normal"> Permissions </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item ">
                                        <Link className="nav-link" to={'/dashboard/roles/'}>
                                            <span className="sidebar-mini"> RL </span>
                                            <span className="sidebar-normal"> Roles </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
