import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import UserLists from "./UserLists";
import moment from 'moment'
require("moment/min/locales.min");
moment.locale('fr');

class UserIndex extends Component {
    constructor () {
        super();
        this.state = {
            users: [],
            per: 12,
            page: 1,
            totalPages: null,
        };

        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount () {
        this.loadItems();
    }

    loadItems() {
        const {per, page, users} = this.state;
        let url = `/api/users?per=${per}&page=${page}`;
       fetch(url).then(res => res.json())
           .then((result) => {this.setState({
                   users: [...users, ...result]
               })
           }, (error) => {
               this.setState({
                   error
               });
           })
    }

    loadMore(){
        this.setState(prevState =>({
            page: prevState.page + 1,
        }),this.loadItems)
    }
    render() {
        const { users } = this.state;
        return (
            <div className="wrapper">

                <NavAdmin/>

                <div className="main-content" id="panel">

                    <TopNavAdmin/>

                    <div className="header bg-primary pb-6">
                        <div className="container-fluid">
                            <div className="header-body">
                                <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-7">
                                        <h6 className="h2 text-white d-inline-block mb-0">Default</h6>
                                        <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                                <li className="breadcrumb-item"><a href="#"><i
                                                    className="fas fa-home"></i></a></li>
                                                <li className="breadcrumb-item"><a href="#">Dashboards</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Default</li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <a href="#" className="btn btn-sm btn-neutral">New</a>
                                        <a href="#" className="btn btn-sm btn-neutral">Filters</a>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Total
                                                            traffic</h5>
                                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                            <i className="ni ni-active-40"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i
                                                        className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">New
                                                            users</h5>
                                                        <span className="h2 font-weight-bold mb-0">2,356</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                            <i className="ni ni-chart-pie-35"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i
                                                        className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Sales</h5>
                                                        <span className="h2 font-weight-bold mb-0">924</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                            <i className="ni ni-money-coins"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i
                                                        className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Performance</h5>
                                                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div
                                                            className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                            <i className="ni ni-chart-bar-32"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i
                                                        className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid mt--6">


                        <div className="row">
                            <div className="col-xl-12">

                                <div className="card">

                                    <div className="card-header">

                                        <h5 className="h3 mb-0">Users site</h5>
                                    </div>

                                    <div className="card-body">
                                        <ul className="list-group list-group-flush list my--3">
                                            {users.map((item) => (
                                                <UserLists key={item.id} {...item}/>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="submit text-center">
                                        <button type={'button'}  onClick={this.loadMore}  className={'btn btn-success btn-warning btn-sm'}>
                                            <b className="title_hover">Load More</b>
                                        </button>
                                    </div>
                                    <br/>
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
export default UserIndex;
