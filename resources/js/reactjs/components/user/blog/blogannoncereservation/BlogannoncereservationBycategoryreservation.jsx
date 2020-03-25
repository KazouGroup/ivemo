import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import Navblogannoncereservations from "./inc/Navblogannoncereservations";
import BlogannoncereservationList from "./BlogannoncereservationList";
import Navlinknewblogannoncereservation from "./treatement/Navlinknewblogannoncereservation";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";


class BlogannoncereservationBycategoryreservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncereservation: {blogannoncereservations:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    unactiveItem(id){
        Swal.fire({
            title: 'Masquer cette article?',
            text: "êtes vous sure de vouloir confirmer cette action?",
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

                //Envoyer la requet au server
                let url = route('blogannoncecategoryreservationunactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette annonce a été masquée <a href=\"/profile/"+$userIvemo.slug+"/personal_settings/blogs/annonces_locations/\" target=\"_blank\" class=\"btn btn-info btn-sm\">Modifier ici</a>",
                            url: "/profile/"+$userIvemo.slug+"/personal_settings/blogs/annonces_locations/",
                            target: "_blank"
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInUp",
                                exit: "animated fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
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
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }

    loadItems(){
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let url = route('api.blogannoncecategoryreservations_site', [itemCategoryannoncereservation]);
        dyaxios.get(url).then(response => this.setState({ blogannoncereservation: response.data, }));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {blogannoncereservation} = this.state;
        const blogannoncereservationsbycategoryreservations = blogannoncereservation.blogannoncereservations;
        const mapAnnoncereservations = blogannoncereservationsbycategoryreservations.length ? (
            blogannoncereservationsbycategoryreservations.map(item => {
                return(
                    <BlogannoncereservationList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Guides et conseils reservation {`${blogannoncereservation.name || 'Annonce'}`} - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + blogannoncereservation.photo + ")" }}>
                            </div>
                            <div className="content-center">

                                <div className="card-body">

                                    <h1 className="title">{blogannoncereservation.name || <Skeleton width={300} />}</h1>

                                    {blogannoncereservation.name ?
                                        <Link to={`/blogs/annonce_reservations/`} className="text-white">
                                            <i className="fa fa-chevron-circle-left" /> <b>Retour aux articles</b>
                                        </Link>
                                        :
                                        <Skeleton width={270}/>
                                    }

                                    {blogannoncereservation.blogannoncereservations_count >= 0 ?
                                        <h5><b>{blogannoncereservation.blogannoncereservations_count}</b> {blogannoncereservation.blogannoncereservations_count > 1 ? "articles" : "article"} posté sur la reservation</h5>
                                        :
                                        <h5> <Skeleton width={200}/></h5>
                                    }

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
                                        <div className="submit text-left">
                                            <Link to={`/blogs/annonce_reservations/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour aux articles</b>
                                            </Link>
                                        </div>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapAnnoncereservations}

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewblogannoncereservation/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navblogannoncereservations/>

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
export default BlogannoncereservationBycategoryreservation;
