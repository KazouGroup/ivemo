import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../../configurations/inc/NavlinkconfigurationUser";
import BlogannonceventeList from "../../../../blog/blognnoncevente/BlogannonceventeList";
import Navblogannonceventesbyuser from "../../../../blog/blognnoncevente/inc/Navblogannonceventesbyuser";
import LinkValicationEmail from "../../../../../inc/user/LinkValicationEmail";


class PrivateUserBlogannonceVentebyCategoryannoncevente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userblogannonceventesPrivate:{blogannonceventes:[]},
            visiable: 20,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
        })
    }

    activeItem(id){
        Swal.fire({
            title: 'Afficher cette article?',
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
                let url = route('blogannoncecategoryventeactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette articles est desormais visible aux utilisateurs",
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
                let url = route('blogannoncecategoryventeunactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette article a été masquée aux utilisateurs",
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

                const url = route('blogannoncecategoryventedelete_site',[id]);
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
        let itemuser = this.props.match.params.user;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        dyaxios.get(route('api.blogannoncesventescategoryannonceventebyuser_site',[itemuser,itemCategoryannoncevente])).then(response => this.setState({userblogannonceventesPrivate: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userblogannonceventesPrivate,visiable} = this.state;
        const mapBlogannoncereservations = userblogannonceventesPrivate.blogannonceventes.length ? (
            userblogannonceventesPrivate.blogannonceventes.slice(0,visiable).map(item => {
                return(
                    <BlogannonceventeList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Articles sur la locations {`${$userIvemo.first_name || 'Profile'}`} - {$name_site}</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/blogs/annonce_ventes/ab/new/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Ajouter une nouvelle article sur la vente/achat</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navblogannonceventesbyuser/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <NavlinkconfigurationUser {...userblogannonceventesPrivate} />


                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <Link to={`/profile/${$userIvemo.slug}/personal_settings/blogs/annonce_ventes/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos articles</b>
                                            </Link>
                                        </div>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapBlogannoncereservations}

                                        {visiable < userblogannonceventesPrivate.blogannonceventes.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                </div>
                                            </div>
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

export default PrivateUserBlogannonceVentebyCategoryannoncevente;
