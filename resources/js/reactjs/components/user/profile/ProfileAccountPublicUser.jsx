import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,Navbar } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import FormContactProfileAccountUser from "./form/FormContactProfileAccountUser";
import PropTypes from "prop-types";
import ProfileAccountTeamUser from "./file_public/ProfileAccountTeamUser";
import NavLinkPublicAnnonceUser from "./annonces/NavLinkPublicAnnonceUser";
import NavNavigatePivateUser from "./NavNavigatePivateUser";
import NavLinkPublicBlogannoncesUser from "./blogs/public/NavLinkPublicBlogannoncesUser";
import FormNewletterSubcribeProfileAccountUser from "./form/FormNewletterSubcribeProfileAccountUser";
import ProfileAccountAvisUser from "./file_public/ProfileAccountAvisUser";
import Skeleton from "react-loading-skeleton";
import ReadMoreAndLess from "react-read-more-less";


class ProfileAccountPublicUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPublick: {profile:[]},
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

    getDescription(userPublick) {
        return { __html: userPublick.profile.description};
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

                            {!userPublick.avatarcover ?
                                <div className="page-header-image" data-parallax="true">
                                    <Skeleton height={400} width={1400} />
                                </div>
                                :
                                <div className="page-header-image" data-parallax="true"
                                style={{ backgroundImage: "url(" + userPublick.avatarcover + ")" }}>

                                </div>
                            }




                            <div className="container">
                                <div className="mt-lg-5 text-left">
                                    <img src={userPublick.avatar} style={{ height: "50px", width: "90px" }} alt={userPublick.first_name}/>

                                    <div className="media-footer">
                                        <h3><b>{userPublick.first_name || <Skeleton width={100} />}</b></h3>

                                        {userPublick.profile.facebook_link && (
                                            <a href={`${userPublick.profile.facebook_link}`} target="_banck" className="btn btn-icon btn-sm btn-facebook">
                                                <i className="fab fa-facebook-square"/>
                                            </a>
                                        )}

                                        {userPublick.profile.twitter_link && (
                                            <a href={`${userPublick.profile.twitter_link}`} target="_banck" className="btn btn-icon btn-sm btn-twitter">
                                                <i className="fab fa-twitter"/>
                                            </a>
                                        )}

                                        {userPublick.profile.instagram_link && (
                                            <a href={`${userPublick.profile.instagram_link}`} target="_banck" className="btn btn-icon btn-sm btn-instagram">
                                                <i className="fab fa-instagram"/>
                                            </a>
                                        )}

                                        {userPublick.profile.youtube_link && (
                                            <a href={`${userPublick.profile.youtube_link}`} target="_banck" className="btn btn-icon btn-sm btn-youtube">
                                                <i className="fab fa-youtube"/>
                                            </a>
                                        )}

                                        {userPublick.profile.linkedin_link && (
                                            <a href={`${userPublick.profile.linkedin_link}`} target="_banck" className="btn btn-icon btn-sm btn-linkedin">
                                                <i className="fab fa-linkedin"/>
                                            </a>
                                        )}

                                        <div className="pull-right">
                                            {userPublick.profile.site_internet && (
                                                <a href={`${userPublick.profile.site_internet}`} className="btn btn-sm btn-secondary" target="_banck">
                                                    <i className="now-ui-icons business_globe"/>
                                                </a>
                                            )}

                                            <Button className="btn btn-sm btn-primary" rel="tooltip" title="3426712192" data-placement="bottom">
                                                <i className="now-ui-icons tech_mobile"/>
                                            </Button>
                                            <a href="#contact" className="btn btn-sm btn-success">
                                                <i className="now-ui-icons ui-2_chat-round"/>
                                            </a>

                                            {!$guest && (
                                                <Fragment>
                                                    {$userIvemo.id === userPublick.id && (
                                                        <Link to={`/profile/account/`} className="btn btn-sm btn-info" >
                                                            <i className="now-ui-icons ui-2_settings-90"/>
                                                        </Link>
                                                    )}
                                                </Fragment>
                                            )}

                                        </div>
                                    </div>
                                </div>
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
                                            <Fragment>
                                                {$userIvemo.id === userPublick.id && (

                                                   <NavNavigatePivateUser/>

                                                )}

                                            </Fragment>

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

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h5><b>About Us</b></h5>
                                                        <ReadMoreAndLess
                                                            className="read-more-content"
                                                            charLimit={250}
                                                            readMoreText="(Plus)"
                                                            readLessText=""
                                                        >
                                                            {userPublick.profile.description || ""}
                                                        </ReadMoreAndLess>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>


                                        {!userPublick.profile.status_team_user ? <></> : <ProfileAccountTeamUser {...this.props}/>}


                                        {!userPublick.profile.status_avis ? <></> :<ProfileAccountAvisUser {...this.props}/>}


                                        <div className="card"  id="contact">
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
                                                        Abonnez-vous à la newsletter de <b>{userPublick.first_name}</b> afin d'être averti des mises à jour
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
