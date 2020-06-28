import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {Button, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import { Remarkable } from "remarkable";
import BlogannoncereservationInteresse from "./BlogannoncereservationInteresse";
import AnnoncereservationInteresseforBlog from "./AnnoncereservationInteresseforBlog";
import moment from "moment";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import ButonFavoris from "../../../inc/vendor/ButonFavoris";
import ButonLiked from "../../../inc/vendor/ButonLiked";
import BlogannoncereservationcommentIndex from "../../comments/BlogannoncereservationcommentIndex";
const abbrev = ['', 'k', 'M', 'B', 'T'];

class BlogannoncereservationShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncereservation: {user:[],categoryannoncereservation:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.likeItem = this.likeItem.bind(this);
        this.unlikeItem = this.unlikeItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
    }

    likeItem(id) {
        const url = route('likeblogannoncereservations_likedata.likedata', [id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unlikeItem(id) {
        const url = route('likeblogannoncereservations_unlikedata.unlikedata', [id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    favoriteItem(id) {
        const url = route('favoriteblogannoncereservations_favorite.favorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Article ajoutée à vos favoris",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'bottom',
                        align: 'center'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInUp",
                        exit: "animate__animated animate__fadeOutDown"
                    },
                });
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unfavoriteItem(id) {
        const url = route('favoriteblogannoncereservations_unfavorite.unfavorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Article retirée de vos favoris",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'bottom',
                        align: 'center'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInUp",
                        exit: "animate__animated animate__fadeOutDown"
                    },
                });
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                const url = route('blogannoncecategoryreservationdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Article de blogs suprimée avec success'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.props.history.push(`/blogs/annonce_reservations/`);
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        });
    }


    loadItems() {
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemdate = this.props.match.params.date;
        let itemblogannoncereservation = this.props.match.params.blogannoncereservation;
        let url = route('api.blogannoncecategoryreservationslug_site', [itemCategoryannoncereservation, itemdate, itemblogannoncereservation]);
        dyaxios.get(url).then(response => this.setState({ blogannoncereservation: response.data, }));
    }


    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    getDescription(blogannoncereservation) {
        return { __html: (blogannoncereservation.description) };
    }
    data_countFormatter(visits_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countlikeFormatter(countlikes, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const { blogannoncereservation } = this.state;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        return (
            <>
                <Helmet>
                    <title>{`${blogannoncereservation.title || 'Annonce'}`} - {$name_site}</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="card">
                                    <div className="card-body">

                                        <div className="card card-plain ">

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

                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                {blogannoncereservation.user.avatar ?
                                                                    <NavLink to={`/pro/${blogannoncereservation.user.slug}/blogs/annonce_reservations/`}>
                                                                        <img src={blogannoncereservation.user.avatar}
                                                                             style={{ height: "40px", width: "80px",borderRadius: "5px" }}
                                                                             alt={blogannoncereservation.user.first_name}
                                                                             className="avatar" />
                                                                    </NavLink>
                                                                    : <Skeleton circle={false} height={40} width={80} />}
                                                                <div className="mx-3">
                                                                    <NavLink to={`/pro/${blogannoncereservation.user.slug}/blogs/annonce_reservations/`} className="text-dark font-weight-600 text-sm"><b>{blogannoncereservation.user.first_name || <Skeleton width={35} />}</b>
                                                                        <small className="d-block text-muted">{moment(blogannoncereservation.created_at).fromNow()}</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>

                                                            <div className="text-right ml-auto">
                                                                {$guest ?
                                                                    <>
                                                                        <Button  data-toggle="modal" data-target="#loginModal"
                                                                                 className="btn btn-facebook btn-sm btn-neutral" title="J'aime cette article">
                                                                             <i className="far fa-heart"></i> <b>{this.data_countlikeFormatter(blogannoncereservation.countlikes || "0")}</b>
                                                                        </Button>

                                                                        <Button  data-toggle="modal" data-target="#loginModal"
                                                                                 className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                            <i className="far fa-bookmark"></i>
                                                                        </Button>
                                                                    </>

                                                                    :
                                                                    <>

                                                                        <ButonLiked likeItem={this.likeItem} unlikeItem={this.unlikeItem} {...blogannoncereservation} />

                                                                        <ButonFavoris favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem} {...blogannoncereservation} />

                                                                        {$userIvemo.id === blogannoncereservation.user_id && (
                                                                            <>
                                                                                <a href={`#${blogannoncereservation.visits_count}`} className="btn btn-sm btn-secondary" title={`${blogannoncereservation.visits_count} ${blogannoncereservation.visits_count > 1 ? "vues" : "vue"}`}>
                                                                                    <i className="far fa-eye"></i> <b>{this.data_countFormatter(blogannoncereservation.visits_count)}</b>
                                                                                </a>
                                                                                <NavLink to={`/blogs/annonce_reservations/${blogannoncereservation.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" title="Editer cet article">
                                                                                    <i className="now-ui-icons ui-2_settings-90" />
                                                                                </NavLink>
                                                                                <Button
                                                                                    className="btn btn-danger btn-icon btn-sm" onClick={() => this.deleteItem(blogannoncereservation.id)} color="secondary" title="Supprimer cette annonce">
                                                                                    <i className="now-ui-icons ui-1_simple-remove" />
                                                                                </Button>{" "}
                                                                            </>
                                                                        )}

                                                                    </>
                                                                }
                                                            </div>

                                                        </div>

                                                        <div className="carousel-inner">
                                                            <div className="carousel-item active">
                                                                <Zoom>
                                                                    {blogannoncereservation.photo ?
                                                                        <img className="d-block"
                                                                             src={blogannoncereservation.photo}
                                                                             style={{ width: "1400px", height: "600px",borderRadius: "5px" }}
                                                                             alt={blogannoncereservation.title} />
                                                                        : <Skeleton height={600} width={1400} />}



                                                                </Zoom>

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="container">
                                                <div className="row justify-content-center ">
                                                    <div className="col-lg-11 ml-auto mr-auto">

                                                        <h2 className="title text-center">{blogannoncereservation.title || <Skeleton width={300} />}</h2>

                                                        {blogannoncereservation.description ?  <div className="title mb-2 text-justify" dangerouslySetInnerHTML={this.getDescription(blogannoncereservation)} />: <Skeleton count={5}/>}

                                                    </div>
                                                </div>
                                            </div>


                                            <BlogannoncereservationcommentIndex {...this.props} />

                                        </div>


                                    </div>
                                </div>

                                <AnnoncereservationInteresseforBlog {... this.props}/>

                                <BlogannoncereservationInteresse  {...this.props} />

                                <div className="text-center">
                                    <a href={`/blogs/annonce_reservations/${itemCategoryannoncereservation}/`}
                                        className="btn btn-outline-info">Voir plus d'articles ici
                                    </a>
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

export default BlogannoncereservationShow;
