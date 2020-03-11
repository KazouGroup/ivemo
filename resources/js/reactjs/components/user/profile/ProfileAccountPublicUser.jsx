import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,Navbar } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import FormContactProfileAccountUser from "./form/FormContactProfileAccountUser";
import PropTypes from "prop-types";
import ProfileAccountTeamUser from "./ProfileAccountTeamUser";
import NavLinkPublicAnnonceUser from "./annonces/NavLinkPublicAnnonceUser";
import NavNavigatePivateUser from "./NavNavigatePivateUser";
import NavLinkPublicBlogannoncesUser from "./blogs/public/NavLinkPublicBlogannoncesUser";
import FormNewletterSubcribeProfileAccountUser from "./form/FormNewletterSubcribeProfileAccountUser";
import ProfileAccountAvisUser from "./ProfileAccountAvisUser";


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
                    <title>{`${userPublick.first_name || 'Profile'}`} - Ivemo</title>
                </Helmet>

                <div className="profile-page sidebar-collapse">

                    <Navbar className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="500" >
                        <NavUserSite />
                    </Navbar>

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
                                <b>@{userPublick.slug}</b>

                            </div>
                        </div>


                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">
                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        {!$guest && (
                                            <>
                                                {$userIvemo.id === userPublick.id && (

                                                   <NavNavigatePivateUser/>

                                                )}

                                            </>

                                        )}


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <div className="card-header text-center">
                                                            <h4 className="card-title"><b>Contacter {userPublick.first_name}</b></h4>
                                                        </div>

                                                        <FormContactProfileAccountUser {...this.props}/>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Annonces {userPublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicAnnonceUser {...this.props} {...userPublick}/>


                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                         <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">

                                                                <div className="card-header" role="tab" id="headingTwo">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                        <b>Articles de {userPublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicBlogannoncesUser {...this.props} {...userPublick}/>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">

                                            </div>
                                        </div>

                                        <ProfileAccountTeamUser {...this.props}/>

                                        <ProfileAccountAvisUser {...this.props}/>

                                        <div className="card">
                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Contacter {userPublick.first_name}</b></h4>
                                                </div>

                                                <FormContactProfileAccountUser {...this.props}/>

                                            </div>
                                        </div>



                                        <div className="card card-raised card-form-horizontal">

                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                    <p className="card-title">
                                                        Abonnez-vous à la newsletter de <b>{userPublick.first_name}</b> afin d'être averti des nouvelles mises à jour
                                                    </p>
                                                </div>

                                                <FormNewletterSubcribeProfileAccountUser {...this.props}/>

                                            </div>
                                        </div>

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
