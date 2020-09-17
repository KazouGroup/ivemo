import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,Row } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import NavLinkPublicBlogannoncesUser from "./NavLinkPublicBlogannoncesUser";
import PublicUserBlogannoncelocationList from "./inc/PublicUserBlogannoncelocationList";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";
import Navlinknewblogannoncelocation from "../../../blog/blogannoncelocation/treatement/Navlinknewblogannoncelocation";
import Skeleton from "react-loading-skeleton";
import BlogannoncePublicuserSkeleton from "../../../../inc/user/blog/BlogannoncePublicuserSkeleton";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import NavLinkPublicEmploymentUser from "../../../../inc/vendor/NavLinkPublicUser";
import ButonSubscribedBlogannonce from "../../../../inc/vendor/ButonSubscribedBlogannonce";
import HelmetSite from "../../../../inc/user/HelmetSite";


class PublicUserBlogannonceLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocations:{categoryannoncelocation:[],user:[]},
            userbloglocationPublick:{profile: []},
            visiable: 20,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.subscribeItem = this.subscribeItem.bind(this);
        this.unsubscribedItem = this.unsubscribedItem.bind(this);
    }
    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
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

                const url = route('blogannoncecategorylocationdelete_site',[id]);
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
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.profilpublique_blogannoncelocations',[itemuser])).then(response => this.setState({blogannoncelocations: response.data,}));
        dyaxios.get(route('api.profilpublique',[itemuser])).then(response => this.setState({userbloglocationPublick: response.data,}));
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userbloglocationPublick,visiable,blogannoncelocations} = this.state;
        const mapBlogannoncelocations = blogannoncelocations.length >= 0 ? (
            blogannoncelocations.slice(0,visiable).map(item => {
                return(
                    <PublicUserBlogannoncelocationList key={item.id} {...item} deleteItem={this.deleteItem}/>
                )
            })
        ):(
            <BlogannoncePublicuserSkeleton/>
        );
        return (
            <>
               <HelmetSite title={`Articles sur la locations ${userbloglocationPublick.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/examples/card-blog15.jpg' + ")" }}>
                            </div>

                            {userbloglocationPublick.first_name && (

                                <div className="content-center">

                                    <div className="card-body">

                                        <h1 className="title">{userbloglocationPublick.first_name || ""}</h1>

                                        {userbloglocationPublick.status_profile === 0 ?
                                            <Link to={`/user/${userbloglocationPublick.slug}/`} className="text-white">
                                                <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userbloglocationPublick.first_name}</b>
                                            </Link>
                                            :
                                            <>
                                                {userbloglocationPublick.slug ?
                                                    <Link to={`/pro/${userbloglocationPublick.slug}/`} className="text-white">
                                                        <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userbloglocationPublick.first_name}</b>
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                            </>

                                        }
                                        {userbloglocationPublick.blogannoncelocations_count >= 0 ?
                                            <h5><b>{userbloglocationPublick.blogannoncelocations_count}</b> {userbloglocationPublick.blogannoncelocations_count > 1 ? "articles" : "article"} posté par {userbloglocationPublick.first_name} sur la location</h5>
                                            :  <></>}

                                        <ButonSubscribedBlogannonce namesubscribed={`Recevoir toutes les notifications`} nameunsubscribed={`Ne plus recevoir les notifications`}
                                                                    titleToltipeSubscribed={`Abonnez vous pour recevoir tous notifications des articles postées par`}
                                                                    titleToltipeUnsubscribed={`Ne plus etre notifier des articles par`}
                                                                    subscribeItem={this.subscribeItem}
                                                                    unsubscribedItem={this.unsubscribedItem}
                                                                    {...userbloglocationPublick}/>

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

                                        {/**<div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article</b>
                                            </NavLink>
                                        </div> */}

                                        {/* Ici c'est le component la creation*/}
                                        <Navlinknewblogannoncelocation/>

                                        {userbloglocationPublick.status_profile === 0 ?
                                              <div className="card">
                                                 <div className="card-body">
                                                     <div className="row">
                                                         <div className="col-md-12">
                                                             <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                                 <div className="card card-plain">
                                                                     <div className="card-header" role="tab" id="headingTwo">
                                                                         <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                             <b>Articles de {userbloglocationPublick.first_name}</b>
                                                                         </a>
                                                                     </div>

                                                                     <NavLinkPublicBlogannoncesUser {...this.props} {...userbloglocationPublick}/>

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
                                                                                <b>Annonces de {userbloglocationPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicAnnonceUser {...this.props} {...userbloglocationPublick}/>

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
                                                                                <b>Annonces de {userbloglocationPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicEmploymentUser {...this.props} {...userbloglocationPublick}/>

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
                                                                                <b>Articles de {userbloglocationPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicBlogannoncesUser {...this.props} {...userbloglocationPublick}/>

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
                                                                    <h4 className="card-title"><b>Contacter {userbloglocationPublick.first_name}</b></h4>
                                                                </div>

                                                                <FormContactProfileAccountUser {...this.props} {...userbloglocationPublick}/>

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

                                            {mapBlogannoncelocations}

                                        </Row>

                                        <div className="text-center">
                                            {visiable < blogannoncelocations.length ?
                                                <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                    <b>Voir plus </b>
                                                </button>
                                                :
                                                <>
                                                    {blogannoncelocations.length > 0 && (
                                                          <ButonSubscribedBlogannonce namesubscribed={`Recevoir toutes les notifications`} nameunsubscribed={`Ne plus recevoir les notifications`}
                                                          titleToltipeSubscribed={`Abonnez vous pour recevoir tous notifications des articles postées par`}
                                                          titleToltipeUnsubscribed={`Ne plus etre notifier des articles par`}
                                                          subscribeItem={this.subscribeItem}
                                                          unsubscribedItem={this.unsubscribedItem}
                                                          {...userbloglocationPublick}/>
                                                    )}
                                                </>
                                            }
                                        </div>


                                        {userbloglocationPublick.status_profile === 1 && (
                                            <>
                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Contacter {userbloglocationPublick.first_name}</b></h4>
                                                    </div>

                                                    <FormContactProfileAccountUser {...this.props} {...userbloglocationPublick}/>

                                                </div>
                                            </div>


                                            <div className="card card-raised card-form-horizontal">

                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                        <p className="card-title">
                                                            Abonnez-vous à la newsletter de <b>{userbloglocationPublick.first_name}</b> afin d'être notifié des mises à jour
                                                        </p>
                                                    </div>

                                                    <FormNewletterSubcribeProfileAccountUser {...this.props} />

                                                </div>
                                            </div>
                                            </>
                                        )}
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

export default PublicUserBlogannonceLocation;
