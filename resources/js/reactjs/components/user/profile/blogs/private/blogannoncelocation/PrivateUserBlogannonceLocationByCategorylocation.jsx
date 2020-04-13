import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../../configurations/inc/NavlinkconfigurationUser";
import BlogannoncelocationList from "../../../../blog/blogannoncelocation/BlogannoncelocationList";
import Navblogannoncelocationsbyuser from "../../../../blog/blogannoncelocation/inc/Navblogannoncelocationsbyuser";
import LinkValicationEmail from "../../../../../inc/user/LinkValicationEmail";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class PrivateUserBlogannonceLocationByCategorylocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocations_count: [],
            blogannoncelocationsactive_count: [],
            blogannoncelocationsunactive_count: [],
            userblogannoncelocationsPrivate:{blogannoncelocations:[]},
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
                let url = route('blogannoncecategorylocationactive_site.site',id);
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
                let url = route('blogannoncecategorylocationunactive_site.site',id);
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
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        fetch(route('api.blogannoncelocations_premium_category_count',[itemuser,itemCategoryannoncelocation])).then(res => res.json())
            .then((result) => {this.setState({blogannoncelocations_count: result});});
        fetch(route('api.blogannoncelocations_premiumactive_category_count',[itemuser,itemCategoryannoncelocation])).then(res => res.json())
            .then((result) => {this.setState({blogannoncelocationsactive_count: result});});
        fetch(route('api.blogannoncelocations_premiumunactive_category_count',[itemuser,itemCategoryannoncelocation])).then(res => res.json())
            .then((result) => {this.setState({blogannoncelocationsunactive_count: result});});

        dyaxios.get(route('api.blogannonceslocationscategoryannoncelocationbyuser_site',[itemuser,itemCategoryannoncelocation])).then(response => this.setState({userblogannoncelocationsPrivate: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    blogannonceventes_countFormatter(blogannoncelocations_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannonceventesactive_countFormatter(blogannoncelocationsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannoncelocationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannonceventesunactive_countFormatter(blogannoncelocationsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannoncelocationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {userblogannoncelocationsPrivate,visiable,blogannoncelocations_count,blogannoncelocationsunactive_count,blogannoncelocationsactive_count} = this.state;
        const mapBlogannoncelocations = userblogannoncelocationsPrivate.blogannoncelocations.length ? (
            userblogannoncelocationsPrivate.blogannoncelocations.slice(0,visiable).map(item => {
                return(
                    <BlogannoncelocationList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Articles sur la locations {`${$userIvemo.first_name || 'Profile'}`} - Ivemo</title>
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
                                            <NavLink className="btn btn-danger" to={`/blogs/annonce_locations/ab/new/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Ajouter une nouvelle article sur la location</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navblogannoncelocationsbyuser/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <NavlinkconfigurationUser {...userblogannoncelocationsPrivate} />

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <Link to={`/profile/${$userIvemo.slug}/personal_settings/blogs/annonce_locations/`} className="btn btn-neutral btn-sm">
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
                                        <div className="row">
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-warning icon-circle">
                                                        <i className="now-ui-icons text_align-center"></i>                                                    </div>
                                                    <h4 className="info-title"><b>{this.blogannonceventes_countFormatter(blogannoncelocations_count)}</b></h4>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-success icon-circle">
                                                        <i className="now-ui-icons ui-1_check"></i>
                                                    </div>
                                                    <h4 className="info-title"><b>{this.blogannonceventesactive_countFormatter(blogannoncelocationsactive_count)}</b></h4>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-primary icon-circle">
                                                        <i className="now-ui-icons ui-1_simple-delete"></i>
                                                    </div>
                                                    <h4 className="info-title"><b>{this.blogannonceventesunactive_countFormatter(blogannoncelocationsunactive_count)}</b></h4>
                                                </div>
                                            </div>
                                        </div>

                                        {mapBlogannoncelocations}

                                        {visiable < userblogannoncelocationsPrivate.blogannoncelocations.length && (
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

export default PrivateUserBlogannonceLocationByCategorylocation;
