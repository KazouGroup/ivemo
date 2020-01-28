import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../inc/admin/TopNavAdmin";
import NavAdmin from "../inc/admin/NavAdmin";
import FooterAdmin from "../inc/admin/FooterAdmin";

class DashboardIndex extends Component {
    render() {
        return (
            <div className="sidebar-mini">
                <div className="wrapper ">
                    <NavAdmin/>


                    <div className="main-panel" id="main-panel">

                        <TopNavAdmin/>

                        <div className="panel-header panel-header-lg">
                            <canvas id="bigDashboardChart"/>
                        </div>


                        <div className="content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-stats">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="statistics">
                                                        <div className="info">
                                                            <div className="icon icon-primary">
                                                                <i className="now-ui-icons ui-2_chat-round"/>
                                                            </div>
                                                            <h3 className="info-title">859</h3>
                                                            <h6 className="stats-title">Messages</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="statistics">
                                                        <div className="info">
                                                            <div className="icon icon-success">
                                                                <i className="now-ui-icons business_money-coins"/>
                                                            </div>
                                                            <h3 className="info-title">
                                                                <small>$</small>3,521</h3>
                                                            <h6 className="stats-title">Today Revenue</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="statistics">
                                                        <div className="info">
                                                            <div className="icon icon-info">
                                                                <i className="now-ui-icons users_single-02"/>
                                                            </div>
                                                            <h3 className="info-title">562</h3>
                                                            <h6 className="stats-title">Customers</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="statistics">
                                                        <div className="info">
                                                            <div className="icon icon-danger">
                                                                <i className="now-ui-icons objects_support-17"/>
                                                            </div>
                                                            <h3 className="info-title">353</h3>
                                                            <h6 className="stats-title">Support Requests</h6>
                                                        </div>
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
            </div>
        );
    }
}
export default DashboardIndex;
