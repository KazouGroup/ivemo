import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import {Button} from "reactstrap";
import PremiumUserBlogannonceVenteList from "./PremiumUserBlogannonceVenteList";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class PremiumUserBlogannonceVente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannonceventes_count: [],
            blogannonceventesactive_count: [],
            blogannonceventesunactive_count: [],
            userblogannonce:[],

        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
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
                            message: "Cette articles est visible aux utilisateurs",
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

                // remove from local state
                let isNotId = item => item.id !== id;
                let updatedItems = this.state.userblogannonce.filter(isNotId);
                this.setState({userblogannonce: updatedItems});

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
                    window.location.reload();
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

   mydatatables(){
       $(function() {
           $('#datatable').DataTable({
               "pagingType": "full_numbers",
               "lengthMenu": [
                   [10, 25, 50, -1],
                   [10, 25, 50, "All"]
               ],
               responsive: true,
               retrieve:true,
               destroy: true,
               autoFill: true,
               colReorder: true,
               language: {
                   search: "_INPUT_",
                   searchPlaceholder: "Search records",
               }

           });
       });
   }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.blogannonceventes_premium_count',[itemuser])).then(response =>
            this.setState({blogannonceventes_count: response.data}));

        dyaxios.get(route('api.blogannonceventes_premiumactive_count',[itemuser])).then(response => {
            this.setState({blogannonceventesactive_count: response.data})});

        dyaxios.get(route('api.blogannonceventes_premiumunactive_count',[itemuser])).then(response =>
            this.setState({blogannonceventesunactive_count: response.data}));

        fetch(route('api.blogannonceventes_premium',[itemuser])).then(res => res.json())
            .then((result) => {
                this.mydatatables();
                this.setState({userblogannonce: result});

            })
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    blogannonces_countFormatter(blogannonceventes_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannoncesactive_countFormatter(blogannonceventesactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannoncesunactive_countFormatter(blogannonceventesunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {userblogannonce,blogannonceventes_count,blogannonceventesactive_count,blogannonceventesunactive_count} = this.state;
        const mapBlogannonceventes = userblogannonce.length ? (
            userblogannonce.map(item => {
                return(
                    <PremiumUserBlogannonceVenteList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} article de blog ventes - Ivemo`} />


                <div className="wrapper ">

                    <PremiumVerticalNavUserSite {...this.props}/>

                    <div className="main-panel" id="main-panel">

                        <PremiumHorizontalNavUserSite/>

                        <div className="panel-header">
                            <div className="header text-center">
                                <h3 className="title">Articles des annonces ventes</h3>
                                <p className="text-white">Articles sur les annonces de ventes</p>
                            </div>
                        </div>

                        <div className="content">

                            <div className="row">
                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-primary icon-circle">
                                                                <i className="now-ui-icons text_align-center"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.blogannonces_countFormatter(blogannonceventes_count)}</h3>
                                                            <h6 className="stats-title">Articles</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons text_align-center"></i> Articles sur les annonces locations
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-success icon-circle">
                                                                <i className="now-ui-icons ui-1_check"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.blogannoncesactive_countFormatter(blogannonceventesactive_count)}</h3>
                                                            <h6 className="stats-title">Actives</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons ui-1_check"/> Articles actives
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mx-auto">
                                    <div className="card card-stats">
                                        <div className="card-body ">
                                            <div className="statistics statistics-horizontal">
                                                <div className="info info-horizontal">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <div className="icon icon-danger icon-circle">
                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h3 className="info-title">{this.blogannoncesunactive_countFormatter(blogannonceventesunactive_count)}</h3>
                                                            <h6 className="stats-title">Desactivés</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-footer ">
                                            <div className="stats">
                                                <i className="now-ui-icons ui-1_simple-delete"/> Articles désactivés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="toolbar">

                                                <div className="submit text-center">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/create/`}
                                                       className="btn btn-primary btn-raised btn-round">
                                                           <span className="btn-label">
                                                            <i className="now-ui-icons ui-1_simple-add"></i>
                                                          </span>
                                                        <b className="title_hover">New article de blog vente</b>
                                                    </Link>
                                                </div>

                                            </div>
                                            <table id="datatable" className="table table-striped table-bordered"  cellSpacing="0" width="100%">
                                                <thead>
                                                <tr>
                                                    <th><b>Image</b></th>
                                                    <th><b>Title</b></th>
                                                    <th><b>Categorie</b></th>
                                                    <th><b>Status</b></th>
                                                    <th><b>Crée</b></th>
                                                    <th className="disabled-sorting text-right">Actions</th>
                                                </tr>
                                                </thead>
                                                <tfoot>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>Categorie</th>
                                                    <th>Status</th>
                                                    <th>Crée</th>
                                                    <th className="disabled-sorting text-right">Actions</th>
                                                </tr>
                                                </tfoot>
                                                <tbody>

                                                {mapBlogannonceventes}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FooterPremiumUser/>

                    </div>
                </div>
            </>

        )
    }
}

export default PremiumUserBlogannonceVente;
