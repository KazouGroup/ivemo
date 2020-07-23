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


   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userannoncelocations} = this.state;
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} - Ivemo`} />

                <PremiumVerticalNavUserSite {...this.props}/>

                <div className="main-panel">

                  <PremiumHorizontalNavUserSite/>

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-primary card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">view_headline</i>
                                            </div>
                                            <p className="card-category"><b>Articles</b></p>
                                            <h3 className="card-title"><b>148</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">view_headline</i> Articles sur les
                                                annonces reservations
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-success card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">done</i>
                                            </div>
                                            <p className="card-category"><b>Activés</b></p>
                                            <h3 className="card-title"><b>18</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">done</i> Articles activés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-danger card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">remove</i>
                                            </div>
                                            <p className="card-category"><b>Déactivés</b></p>
                                            <h3 className="card-title"><b>15</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">remove</i> Articles déactivés
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-12 expo">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-icon card-header-primary">
                                        <div className="card-icon">
                                            <i className="material-icons">view_headline</i>
                                        </div>
                                        <p className="card-category">
                                            <b>Articles sur les annonces locations</b>
                                        </p>
                                        <h3 className="card-title" style={{color: "red"}}>
                                            <b>148</b>
                                        </h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">view_headline</i>
                                            <b>Articles sur les annonces locations</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <br/>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card card-product">
                                            <div className="card-header card-header-image" data-header-animation="true">
                                                <a href="#pablo">
                                                    <img className="img" src="/assets/dashboard/assets/img/card-2.jpg"/>
                                                </a>
                                            </div>
                                            <div className="card-body">
                                                <div className="card-actions text-center">
                                                    <button type="button"
                                                            className="btn btn-danger btn-link fix-broken-card">
                                                        <i className="material-icons">build</i> Fix Header!
                                                    </button>
                                                    <button type="button" className="btn btn-default btn-link"
                                                            rel="tooltip" data-placement="bottom" title="View">
                                                        <i className="material-icons">art_track</i>
                                                    </button>
                                                    <button type="button" className="btn btn-success btn-link"
                                                            rel="tooltip" data-placement="bottom" title="Edit">
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-link"
                                                            rel="tooltip" data-placement="bottom" title="Remove">
                                                        <i className="material-icons">close</i>
                                                    </button>
                                                </div>
                                                <h4 className="card-title">
                                                    <a href="#pablo">Cozy 5 Stars Apartment</a>
                                                </h4>
                                                <div className="card-description">
                                                    The place is close to Barceloneta Beach and bus stop just 2 min by
                                                    walk and near to "Naviglio" where you can enjoy the main night life
                                                    in Barcelona.
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="price">
                                                    <h4>$899/night</h4>
                                                </div>
                                                <div className="stats">
                                                    <p className="card-category"><i
                                                        className="material-icons">place</i> Barcelona, Spain</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card card-product">
                                            <div className="card-header card-header-image" data-header-animation="true">
                                                <a href="#pablo">
                                                    <img className="img" src="/assets/dashboard/assets/img/card-3.jpg"/>
                                                </a>
                                            </div>
                                            <div className="card-body">
                                                <div className="card-actions text-center">
                                                    <button type="button"
                                                            className="btn btn-danger btn-link fix-broken-card">
                                                        <i className="material-icons">build</i> Fix Header!
                                                    </button>
                                                    <button type="button" className="btn btn-default btn-link"
                                                            rel="tooltip" data-placement="bottom" title="View">
                                                        <i className="material-icons">art_track</i>
                                                    </button>
                                                    <button type="button" className="btn btn-success btn-link"
                                                            rel="tooltip" data-placement="bottom" title="Edit">
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-link"
                                                            rel="tooltip" data-placement="bottom" title="Remove">
                                                        <i className="material-icons">close</i>
                                                    </button>
                                                </div>
                                                <h4 className="card-title">
                                                    <a href="#pablo">Office Studio</a>
                                                </h4>
                                                <div className="card-description">
                                                    The place is close to Metro Station and bus stop just 2 min by walk
                                                    and near to "Naviglio" where you can enjoy the night life in London,
                                                    UK.
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="price">
                                                    <h4>$1.119/night</h4>
                                                </div>
                                                <div className="stats">
                                                    <p className="card-category"><i
                                                        className="material-icons">place</i> London, UK</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card card-product">
                                            <div className="card-header card-header-image" data-header-animation="true">
                                                <a href="#pablo">
                                                    <img className="img" src="/assets/dashboard/assets/img/card-1.jpg"/>
                                                </a>
                                            </div>
                                            <div className="card-body">
                                                <div className="card-actions text-center">
                                                    <button type="button"
                                                            className="btn btn-danger btn-link fix-broken-card">
                                                        <i className="material-icons">build</i> Fix Header!
                                                    </button>
                                                    <button type="button" className="btn btn-default btn-link"
                                                            rel="tooltip" data-placement="bottom" title="View">
                                                        <i className="material-icons">art_track</i>
                                                    </button>
                                                    <button type="button" className="btn btn-success btn-link"
                                                            rel="tooltip" data-placement="bottom" title="Edit">
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-link"
                                                            rel="tooltip" data-placement="bottom" title="Remove">
                                                        <i className="material-icons">close</i>
                                                    </button>
                                                </div>
                                                <h4 className="card-title">
                                                    <a href="#pablo">Beautiful Castle</a>
                                                </h4>
                                                <div className="card-description">
                                                    The place is close to Metro Station and bus stop just 2 min by walk
                                                    and near to "Naviglio" where you can enjoy the main night life in
                                                    Milan.
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="price">
                                                    <h4>$459/night</h4>
                                                </div>
                                                <div className="stats">
                                                    <p className="card-category"><i
                                                        className="material-icons">place</i> Milan, Italy</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>

                    <FooterPremiumUser/>

                </div>


            </>

        )
    }
}

export default IndexPremium;
