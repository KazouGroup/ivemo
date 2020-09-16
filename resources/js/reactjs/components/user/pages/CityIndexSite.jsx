import React, {useState, useEffect, Fragment, Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import HelmetSite from "../../inc/user/HelmetSite";
import ReadMoreAndLess from "react-read-more-less";
import CitycommentIndex from "../comments/CitycommentIndex";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadCityItemshow,likecityItem,unlikecityItem} from "../../../redux/actions/citiesActions";
import Skeleton from "react-loading-skeleton";
import {Button} from "reactstrap";
import ActivitycityInteresse from "./activitycity/ActivitycityInteresse";


class CityIndexSite extends Component {

    // Lifecycle Component Method
    componentDidMount() {
        this.props.loadCityItemshow(this.props);
    }

    getDescription(city) {
        return {__html: city.description};
    }

    render() {
        const {city} = this.props;
        return (
            <Fragment>

                <HelmetSite title={`${city.name || $name_site}  - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + city.photo + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h2 className="title">{city.name}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main main-raised">
                            <br/>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-12 ml-auto mr-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>

                            <div className="container">

                                <div className="row">
                                    <div className="col-md-3 mx-auto">

                                        <div className="submit text-center">
                                            {$guest ?
                                                <>
                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                            className="btn btn-facebook btn-sm btn-neutral" title={`${city.countlikes} J\'aime`}>
                                                        <i className="far fa-heart"></i> <b> J'aime</b>
                                                    </Button>
                                                </>
                                                :
                                                <>

                                                    {city.likeked ?
                                                        <>
                                                            <Button onClick={() => this.props.unlikecityItem(city)}
                                                                    className="btn btn-danger btn-sm" title={`${city.countlikes} J\'aime`}>
                                                                <i className="fas fa-heart"></i> <b> J'aime</b>
                                                            </Button>
                                                        </>
                                                        :
                                                        <>
                                                            <Button onClick={() => this.props.likecityItem(city)}
                                                                    className="btn btn-facebook btn-sm btn-neutral" title={`${city.countlikes} J\'aime`}>
                                                                <i className="far fa-heart"></i> <b> J'aime</b>
                                                            </Button>
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                {city.name && (
                                                                    <div className="card-header" role="tab" id="headingOne">
                                                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                            <b>Ne rater rien sur {city.name}</b>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            {city.name ?
                                                                                    <>
                                                                                        <tr>
                                                                                            <td> <Link to={`/al/locations/${city.slug}/`} className="text-info" >Location à {city.name}</Link></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td> <Link to={`/av/ventes/${city.slug}/`} className="text-info" >Ventes/Achat à {city.name}</Link></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td> <Link to={`/employment/${city.slug}/`} className="text-info" >Emplois & services à {city.name}</Link></td>
                                                                                        </tr>
                                                                                    </>

                                                                                :

                                                                                <tr>
                                                                                    <td>
                                                                                        <strong><Skeleton width={200} count={5}/></strong>
                                                                                    </td>
                                                                                </tr>

                                                                            }

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-9 mx-auto">

                                        <h3 className="text-center title">{city.name ? <>Bon a savoir sur {city.name}</> : <Skeleton width={255} />}</h3>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        {city.name ? <div className="title text-justify" dangerouslySetInnerHTML={this.getDescription(city)} />: <Skeleton count={5}/>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {city.link_video && (

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12 mx-auto">
                                                            <h5><b>{city.name} - Guide en vidéo</b></h5>

                                                            <iframe border="2px solid #ccc" width="100%" height="315"
                                                                    src={city.link_video}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen></iframe>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}


                                        <ActivitycityInteresse {...this.props} {...city} />



                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        {city.name && (

                                                            <h5><b>Avis sur {city.name}</b></h5>
                                                        )}


                                                        <CitycommentIndex {...this.props} {...city} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                        </div>
                                    </div>
                                </div>

                                {city.name && (
                                    <h5><b>Ville similaire a {city.name}</b></h5>
                                )}
                                <div className="row">

                                    <div className="col-md-3">
                                        <Link to={`/city/yaounde/`}>
                                            <div className="card card-background card-raised" data-background-color=""
                                                 style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg1.jpg' + ")" }}>
                                                <div className="info">

                                                    <div className="description">
                                                        <h4 className="info-title">Yaounde</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-md-3">
                                        <Link to={`/city/douala/`}>
                                            <div className="card card-background card-raised" data-background-color=""
                                                 style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg4.jpg' + ")" }}>
                                                <div className="info">
                                                    <div className="description">
                                                        <h4 className="info-title">Douala</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-md-3">
                                        <Link to={`/city/bafousam/`}>
                                            <div className="card card-background card-raised" data-background-color=""
                                                 style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg4.jpg' + ")" }}>
                                                <div className="info">
                                                    <div className="description">
                                                        <h4 className="info-title">Bafousam</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-md-3">
                                        <Link to={`/city/dschang/`}>
                                            <div className="card card-background card-raised" data-background-color=""
                                                 style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg3.jpg' + ")" }}>
                                                <div className="info">
                                                    <div className="description">
                                                        <h4 className="info-title">Dschang</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>



                                </div>

                            </div>




                        </div>



                        <FooterBigUserSite />
                    </div>
                </div>

            </Fragment>

        );
    }
}

CityIndexSite.propTypes = {
    loadCityItemshow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    city: state.pages.city

});

export default connect(mapStateToProps, {loadCityItemshow,likecityItem,unlikecityItem})(CityIndexSite);
