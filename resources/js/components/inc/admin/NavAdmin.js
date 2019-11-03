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
                name: response.data.name,
                avatar: response.data.avatar,
                created_at: response.data.created_at,
            })

        );
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
                                  {this.state.name}
                                <b className="caret"></b>
                              </span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/dashboard/'}>
                                            <span className="sidebar-mini"> MP </span>
                                            <span className="sidebar-normal"> My Profile </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/dashboard/'}>
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
                            <NavLink className="nav-link" to={'/dashboard'}>
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
                                        <a className="nav-link" href="../examples/pages/pricing.html">
                                            <span className="sidebar-mini"> P </span>
                                            <span className="sidebar-normal"> Pricing </span>
                                        </a>
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
