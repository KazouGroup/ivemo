import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import FormContactProfileAccountUser from "./form/FormContactProfileAccountUser";


class ProfileAccountPublicUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPublick: [],
        };
    }
    loadItems(){
        let itemuser = this.props.match.params.user;
        let url = route('api.profilpublique',[itemuser]);
        dyaxios.get(url).then(response => this.setState({userPublick: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userPublick} = this.state;
        return (
            <>
                <Helmet>
                    <title>{`${userPublick.first_name}`} - Ivemo</title>
                </Helmet>

                <div className="profile-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="500">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="page-header clear-filter page-header-small">
                            <div className="page-header-image" data-parallax="true"
                                 style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="container">
                                <div className="photo-container">
                                    <img src={userPublick.avatar} alt={userPublick.first_name}/>
                                </div>
                                <h3 className="title">{userPublick.first_name}</h3>
                                <p className="category">Photographer</p>

                            </div>
                        </div>

                        <div className="section">
                            <div className="container">

                                <div className="col-md-12 mx-auto">
                                    <div className="text-center">
                                        <h4 className="title">Notre Team</h4>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-3 mx-auto">
                                            <div className="card card-profile card-plain">
                                                <div className="card-avatar">
                                                    <a href="#pablo">
                                                        <img className="img img-raised" src="/assets/vendor/assets/img/mike.jpg"/>
                                                    </a>
                                                </div>
                                                <div className="card-body">
                                                    <h4 className="card-title">Alec Mike</h4>
                                                    <h6 className="category text-gray">
                                                        Designer
                                                    </h6>
                                                    <p className="card-description">
                                                        One of the co-founders. Alec drives the technical strategy of
                                                        the platform, customer support and brand.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mx-auto">
                                            <div className="card card-profile card-plain">
                                                <div className="card-avatar">
                                                    <a href="#pablo">
                                                        <img className="img img-raised" src="/assets/vendor/assets/img/mike.jpg"/>
                                                    </a>
                                                </div>
                                                <div className="card-body">
                                                    <h4 className="card-title">Alec Mike</h4>
                                                    <h6 className="category text-gray">
                                                        Designer
                                                    </h6>
                                                    <p className="card-description">
                                                        One of the co-founders. Alec drives the technical strategy of
                                                        the platform, customer support and brand.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mx-auto">
                                            <div className="card card-profile card-plain">
                                                <div className="card-avatar">
                                                    <a href="#pablo">
                                                        <img className="img img-raised" src="/assets/vendor/assets/img/mike.jpg"/>
                                                    </a>
                                                </div>
                                                <div className="card-body">
                                                    <h4 className="card-title">Alec Mike</h4>
                                                    <h6 className="category text-gray">
                                                        Designer
                                                    </h6>
                                                    <p className="card-description">
                                                        One of the co-founders. Alec drives the technical strategy of
                                                        the platform, customer support and brand.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mx-auto">
                                            <div className="card card-profile card-plain">
                                                <div className="card-avatar">
                                                    <a href="#pablo">
                                                        <img className="img img-raised" src="/assets/vendor/assets/img/mike.jpg"/>
                                                    </a>
                                                </div>
                                                <div className="card-body">
                                                    <h4 className="card-title">Alec Mike</h4>
                                                    <h6 className="category text-gray">
                                                        Designer
                                                    </h6>
                                                    <p className="card-description">
                                                        One of the co-founders. Alec drives the technical strategy of
                                                        the platform, customer support and brand.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-8 mx-auto ">

                                    <div className="card card-contact card-raised">
                                        <div className="card-header text-center">
                                            <h4 className="card-title"><b>Contacter {userPublick.first_name}</b></h4>
                                        </div>

                                       <FormContactProfileAccountUser/>

                                    </div>
                                </div>

                            </div>
                        </div>




                        <FooterUserSite />
                    </div>
                </div>
            </>



        )
    }
}

export default ProfileAccountPublicUser;
