import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Row } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import NavLinkPublicBlogannoncesUser from "./NavLinkPublicBlogannoncesUser";
import PublicUserBlogannoncereservationList from "./inc/PublicUserBlogannoncereservationList";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";
import Navlinknewblogannoncereservation
    from "../../../blog/blogannoncereservation/treatement/Navlinknewblogannoncereservation";
import BlogannoncePublicuserSkeleton from "../../../../inc/user/blog/BlogannoncePublicuserSkeleton";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import NavLinkPublicEmploymentUser from "../../../../inc/vendor/NavLinkPublicUser";
import HelmetSite from "../../../../inc/user/HelmetSite";
import ButonSubscribedBlogannonce from "../../../../inc/vendor/ButonSubscribedBlogannonce";


class PublicUserBlogannonceReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncereservations:{categoryannoncereservation:[],user:[]},
            userblogreservationPublick: { profile: [] },
            visiable: 20,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.subscribeItem = this.subscribeItem.bind(this);
        this.unsubscribedItem = this.unsubscribedItem.bind(this);
    }
    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 20 }
        })
    }

    subscribeItem(id) {
        const url = route('blogannonces_subscribe.subscribe', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Notifications activé",
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

    unsubscribedItem(id) {
        const url = route('blogannonces_unsubscribe.unsubscribe', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Notifications desactivé",
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

                const url = route('blogannoncecategoryreservationdelete_site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Articles suprimée avec success'
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
                    this.loadItems();
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
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.profilpublique_blogannoncerewservations', [itemuser])).then(response => this.setState({blogannoncereservations: response.data,}));
        dyaxios.get(route('api.profilpublique', [itemuser])).then(response => this.setState({userblogreservationPublick: response.data,}));
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const { userblogreservationPublick, visiable,blogannoncereservations } = this.state;
        const mapBlogannoncereservations = blogannoncereservations.length >= 0 ? (
            blogannoncereservations.slice(0,visiable).map(item => {
                return(
                    <PublicUserBlogannoncereservationList key={item.id} {...item} deleteItem={this.deleteItem} />
                )
            })
        ):(
            <BlogannoncePublicuserSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Articles sur la reservations ${userblogreservationPublick.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>

                            {userblogreservationPublick.first_name && (
                                <div className="content-center">

                                    <div className="card-body">

                                        <h1 className="title">{userblogreservationPublick.first_name || ""}</h1>

                                        {userblogreservationPublick.status_profile === 0 ?
                                            <Link to={`/user/${userblogreservationPublick.slug}/`} className="text-white">
                                                <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userblogreservationPublick.first_name}</b>
                                            </Link>
                                            :
                                            <Link to={`/pro/${userblogreservationPublick.slug}/`} className="text-white">
                                                <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userblogreservationPublick.first_name}</b>
                                            </Link>
                                        }

                                        {userblogreservationPublick.blogannoncereservations_count >= 0 ?
                                            <h5><b>{userblogreservationPublick.blogannoncereservations_count}</b> {userblogreservationPublick.blogannoncereservations_count > 1 ? "articles" : "article"} posté par {userblogreservationPublick.first_name} sur la reservation</h5>
                                            : <></>}

                                        <ButonSubscribedBlogannonce namesubscribed={`Recevoir toutes les notifications`} nameunsubscribed={`Ne plus recevoir les notifications`}
                                                                    titleToltipeSubscribed={`Abonnez vous pour recevoir tous notifications des articles postées par`}
                                                                    titleToltipeUnsubscribed={`Ne plus etre notifier des articles par`}
                                                                    subscribeItem={this.subscribeItem}
                                                                    unsubscribedItem={this.unsubscribedItem}
                                                                    {...userblogreservationPublick}/>
                                    </div>

                                </div>
                            )}

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

                                        {/** <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add" /> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>*/}

                                        <Navlinknewblogannoncereservation/>

                                        {userblogreservationPublick.status_profile === 0 ?
                                           <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingTwo">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                        <b>Articles de {userblogreservationPublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicBlogannoncesUser {...this.props} {...userblogreservationPublick} />

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            :
                                            <>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                                    <div className="card card-plain">
                                                                        <div className="card-header" role="tab" id="headingOne">
                                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                                <b>Annonces de {userblogreservationPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicAnnonceUser {...this.props} {...userblogreservationPublick} />

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
                                                                        <div className="card-header" role="tab" id="headingTree">
                                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTree" aria-expanded="true" aria-controls="collapseTree">
                                                                                <b>Annonces de {userblogreservationPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicEmploymentUser {...this.props} {...userblogreservationPublick}/>

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
                                                                                <b>Articles de {userblogreservationPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicBlogannoncesUser {...this.props} {...userblogreservationPublick} />

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

                                                                <div className="card-header text-center">
                                                                    <h4 className="card-title"><b>Contacter {userblogreservationPublick.first_name}</b></h4>
                                                                </div>

                                                                <FormContactProfileAccountUser {...this.props} {...userblogreservationPublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <Row>

                                            {mapBlogannoncereservations}

                                        </Row>
                                        <div className="text-center">
                                            {visiable < blogannoncereservations.length ?
                                                <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                    <b>Voir plus </b>
                                                </button>
                                                :
                                                <>
                                                    {blogannoncereservations.length > 0 && (
                                                        <ButonSubscribedBlogannonce namesubscribed={`Recevoir toutes les notifications`} nameunsubscribed={`Ne plus recevoir les notifications`}
                                                                                    titleToltipeSubscribed={`Abonnez vous pour recevoir tous notifications des articles postées par`}
                                                                                    titleToltipeUnsubscribed={`Ne plus etre notifier des articles par`}
                                                                                    subscribeItem={this.subscribeItem}
                                                                                    unsubscribedItem={this.unsubscribedItem}
                                                                                    {...userblogreservationPublick}/>
                                                    )}

                                                </>

                                            }
                                        </div>




                                        <div className="card">
                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Contacter {userblogreservationPublick.first_name}</b></h4>
                                                </div>

                                                <FormContactProfileAccountUser {...this.props} {...userblogreservationPublick}/>

                                            </div>
                                        </div>

                                        <div className="card card-raised card-form-horizontal">

                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                    <p className="card-title">
                                                        Abonnez-vous à la newsletter de <b>{userblogreservationPublick.first_name}</b> afin d'être notifié des mises à jour
                                                    </p>
                                                </div>

                                                <FormNewletterSubcribeProfileAccountUser {...this.props} />

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

export default PublicUserBlogannonceReservation;
