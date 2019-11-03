import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../inc/admin/TopNavAdmin";
import NavAdmin from "../inc/admin/NavAdmin";
import FooterAdmin from "../inc/admin/FooterAdmin";

export default class DashboardIndex extends Component {
    render() {
        return (
            <div className="wrapper">

                <NavAdmin/>

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="content">
                            <div className="container-fluid">

                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header card-header-warning card-header-icon">
                                                <div className="card-icon">
                                                    <i className="material-icons">weekend</i>
                                                </div>
                                                <p className="card-category">Bookings</p>
                                                <h3 className="card-title">184</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons text-danger">warning</i>
                                                    <a href="#pablo">Get More Space...</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header card-header-rose card-header-icon">
                                                <div className="card-icon">
                                                    <i className="material-icons">equalizer</i>
                                                </div>
                                                <p className="card-category">Website Visits</p>
                                                <h3 className="card-title">75.521</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">local_offer</i> Tracked from Google
                                                    Analytics
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header card-header-success card-header-icon">
                                                <div className="card-icon">
                                                    <i className="material-icons">store</i>
                                                </div>
                                                <p className="card-category">Revenue</p>
                                                <h3 className="card-title">$34,245</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">date_range</i> Last 24 Hours
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header card-header-info card-header-icon">
                                                <div className="card-icon">
                                                    <i className="fa fa-twitter"></i>
                                                </div>
                                                <p className="card-category">Followers</p>
                                                <h3 className="card-title">+245</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">update</i> Just Updated
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <FooterAdmin/>
                </div>
            </div>
        );
    }
}
