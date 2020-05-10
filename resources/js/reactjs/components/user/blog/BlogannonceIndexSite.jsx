import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Helmet} from "react-helmet";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import {Button, Form,Alert,Input} from "reactstrap";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import BlogannonceListSkeleton from "../../inc/user/blog/BlogannonceListSkeleton";
import BlogannoncelocationForIndexList from "./blogannoncelocation/inc/BlogannoncelocationForIndexList";
import BlogannonceventeForIndexList from "./blognnoncevente/inc/BlogannonceventeForIndexList";
import BlogannoncereservationForIndexList from "./blogannoncereservation/inc/BlogannoncereservationForIndexList";
require("moment/min/locales.min");
moment.locale('fr');

class BlogannonceIndexSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocations:{categoryannoncelocation:[],user:[]},
            blogannoncereservations:{categoryannoncereservation:[],user:[]},
            blogannonceventes:{categoryannoncevente:[],user:[]},
        };

    }


    componentDidMount() {
        fetch(route('api.blogs_annonces_four_locations')).then(res => res.json()).then((result) => {
            this.setState({
                blogannoncelocations: [...result]
            });
        });
        fetch(route('api.blogs_annonces_four_reservations')).then(res => res.json()).then((result) => {
            this.setState({
                blogannoncereservations: [...result]
            });
        });
        fetch(route('api.blogs_annonces_four_ventes')).then(res => res.json()).then((result) => {
            this.setState({
                blogannonceventes: [...result]
            });
        });
    }

    render() {
        const {blogannoncelocations,blogannoncereservations,blogannonceventes} = this.state;
        const mapBlogannoncelocations = blogannoncelocations.length >= 0 ? (
            blogannoncelocations.map(item => {
                return(

                    <BlogannoncelocationForIndexList key={item.id} {...item} />
                )
            })
        ):(
            <BlogannonceListSkeleton/>
        );
        const mapBlogannoncereservations = blogannoncereservations.length >= 0 ? (
            blogannoncereservations.map(item => {
                return(
                    <BlogannoncereservationForIndexList key={item.id} {...item} />
                )
            })
        ):(
            <BlogannonceListSkeleton/>
        );
        const mapBlogannonceventes = blogannonceventes.length >= 0 ? (
            blogannonceventes.map(item => {
                return(
                    <BlogannonceventeForIndexList key={item.id} {...item} />
                )
            })
        ):(
            <BlogannonceListSkeleton/>
        );
        return (
            <>

                <Helmet>
                    <title>Conseils tout savoir sur l'imobilier - {$name_site}</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400" >
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h3 className="title">Blog comment trouver, acheter ou vendre un bien en toute securiter  </h3>
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


                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {/* Blog des annonces locations */}
                                        {blogannoncelocations.length > 0 && (
                                            <div className="row d-flex align-items-end">
                                                <div className="col-md-12 mx-auto">
                                                    <h5 className="title">Blog sur les annonces locations </h5>
                                                </div>
                                            </div>
                                        )}

                                        {mapBlogannoncelocations}

                                        {blogannoncelocations.length > 0 && (
                                            <div className="text-center">
                                                <Link to={`/blogs/annonce_locations/`} className="btn btn-primary btn-lg">
                                                    <b>Voir plus d'articles</b>
                                                </Link>

                                                {!$guest ?
                                                    <NavLink className="btn btn-danger btn-lg" to={`/blogs/annonce_locations/ab/new/`}>
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la location</b>
                                                    </NavLink>
                                                    :
                                                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger btn-lg">
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la location</b>
                                                    </a>
                                                }
                                            </div>
                                        )}

                                        {/* Blog des annonces reservations */}
                                        {blogannoncereservations.length > 0 && (
                                            <div className="row d-flex align-items-end">
                                                <div className="col-md-12 mx-auto">
                                                    <h5 className="title">Blog sur les annonces reservations </h5>
                                                </div>
                                            </div>
                                        )}


                                        {mapBlogannoncereservations}

                                        {blogannoncereservations.length > 0 && (
                                            <div className="text-center">
                                                <Link to={`/blogs/annonce_reservations/`} className="btn btn-primary btn-lg">
                                                    <b>Voir plus d'articles</b>
                                                </Link>
                                                {!$guest ?
                                                    <NavLink className="btn btn-danger btn-lg" to={`/blogs/annonce_reservations/ab/new/`}>
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la reservation</b>
                                                    </NavLink>
                                                    :
                                                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger btn-lg">
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la reservation</b>
                                                    </a>
                                                }
                                            </div>
                                        )}

                                        {/* Blog des annonces ventes */}
                                        {blogannonceventes.length > 0 && (
                                            <div className="row d-flex align-items-end">
                                                <div className="col-md-12 mx-auto">
                                                    <h5 className="title">Blog sur les annonces ventes </h5>
                                                </div>
                                            </div>
                                        )}


                                        {mapBlogannonceventes}

                                        {blogannonceventes.length > 0 &&(
                                            <div className="text-center">
                                                <Link to={`/blogs/annonce_ventes/`} className="btn btn-primary btn-lg">
                                                    <b>Voir plus d'articles</b>
                                                </Link>
                                                {!$guest ?
                                                    <NavLink className="btn btn-danger btn-lg" to={`/blogs/annonce_ventes/ab/new/`}>
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la vente/achat</b>
                                                    </NavLink>
                                                    :
                                                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger btn-lg">
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la vente/achat</b>
                                                    </a>
                                                }
                                            </div>
                                        )}


                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">



                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">




                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        <b>Annonces locations populaire</b>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            MateLabs mixes machine learning model
                                                                                      </span>
                                                                                    </a>

                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/julie.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            Temgoua mixes machine learning model
                                                                                      </span>
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/examples/card-blog11.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            Bokino mixes machine learning model
                                                                                      </span>
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/examples/card-blog11.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
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




                                </div>
                            </div>



                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>

            </>
        )
    }

}

export default BlogannonceIndexSite;
