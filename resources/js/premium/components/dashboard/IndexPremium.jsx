import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import FooterPremiumUser from "../inc/FooterPremiumUser";
import PremiumVerticalNavUserSite from "../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../inc/PremiumHorizontalNavUserSite";


class IndexPremium extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userannoncelocations:{profile:[]}
        }
    }


    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.annonceslocationsbyuser_site', [itemuser])).then(response => this.setState({ userannoncelocations: response.data, }));
    }


    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }


    render() {
        const {userannoncelocations} = this.state;
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} - Ivemo`} />


                <div className="wrapper ">

                  <PremiumVerticalNavUserSite {...this.props}/>

                    <div className="main-panel" id="main-panel">

                        <PremiumHorizontalNavUserSite/>

                        <div className="panel-header">
                            <div className="header text-center">
                                <h2 className="title">Dashboard {userannoncelocations.slug}</h2>
                                <p className="text-white">Handcrafted by our friends from</p>
                            </div>
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
                                                                <i className="now-ui-icons ui-2_chat-round"></i>
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
                                                                <i className="now-ui-icons business_money-coins"></i>
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
                                                                <i className="now-ui-icons users_single-02"></i>
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
                                                                <i className="now-ui-icons objects_support-17"></i>
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

                            <div className="row">

                                <div className="col-lg-6 col-md-12 text-center">
                                    <div className="card card-contributions">

                                        <div className="card-body ">
                                            <h1 className="card-title">3,521</h1>
                                            <h3 className="card-category">Total Public Contributions</h3>
                                            <p className="card-description">After a very successful two-year run, we’re
                                                going to be changing the way that contributions work.</p>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-lg-6 col-md-12 text-center">
                                    <div className="card card-contributions">

                                        <div className="card-body ">
                                            <h1 className="card-title">3,521</h1>
                                            <h3 className="card-category">Total Public Contributions</h3>
                                            <p className="card-description">After a very successful two-year run, we’re
                                                going to be changing the way that contributions work.</p>
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">

                                        </div>
                                        <div className="card-body">

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <FooterPremiumUser/>

                    </div>
                </div>

            </>

        )
    }
}

export default IndexPremium;
