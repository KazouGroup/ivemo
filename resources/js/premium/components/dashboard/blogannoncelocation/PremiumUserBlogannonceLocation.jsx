import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import {Button} from "reactstrap";
import PremiumUserBlogannonceList from "./PremiumUserBlogannonceList";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class PremiumUserBlogannonceLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocations_count: [],
            blogannoncelocationsactive_count: [],
            blogannoncelocationsunactive_count: [],
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
                let url = route('blogannoncecategorylocationactive_site.site',id);
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

                // remove from local state
                let isNotId = item => item.id !== id;
                let updatedItems = this.state.userblogannonce.filter(isNotId);
                this.setState({userblogannonce: updatedItems});

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
        dyaxios.get(route('api.blogannoncelocations_premium_count',[itemuser])).then(response =>
            this.setState({blogannoncelocations_count: response.data}));

        dyaxios.get(route('api.blogannoncelocations_premiumactive_count',[itemuser])).then(response => {
            this.setState({blogannoncelocationsactive_count: response.data})});

        dyaxios.get(route('api.blogannoncelocations_premiumunactive_count',[itemuser])).then(response =>
            this.setState({blogannoncelocationsunactive_count: response.data}));

        fetch(route('api.blogannoncelocations_premium',[itemuser])).then(res => res.json())
            .then((result) => {
                this.mydatatables();
                this.setState({userblogannonce: result});

            })
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
        const {userblogannonce,blogannoncelocations_count,blogannoncelocationsactive_count,blogannoncelocationsunactive_count} = this.state;
        const mapBlogannoncelocations = userblogannonce.length ? (
            userblogannonce.map(item => {
                return(
                    <PremiumUserBlogannonceList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} - Ivemo`} />


                <div className="wrapper ">

                    <PremiumVerticalNavUserSite {...this.props}/>

                    <div className="main-panel" id="main-panel">

                        <PremiumHorizontalNavUserSite/>

                        <div className="panel-header">
                            <div className="header text-center">
                                <h3 className="title">Articles annonces locations</h3>
                                <p className="text-white">Articles sur les annonces de locations</p>
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
                                                            <h3 className="info-title">{this.blogannonceventes_countFormatter(blogannoncelocations_count)}</h3>
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
                                                            <h3 className="info-title">{this.blogannonceventesactive_countFormatter(blogannoncelocationsactive_count)}</h3>
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
                                                            <h3 className="info-title">{this.blogannonceventesunactive_countFormatter(blogannoncelocationsunactive_count)}</h3>
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
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_locations/create/`}
                                                       className="btn btn-primary btn-raised btn-round">
                                                           <span className="btn-label">
                                                            <i className="now-ui-icons ui-1_simple-add"></i>
                                                          </span>
                                                        <b className="title_hover">New article de blog location</b>
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

                                                {mapBlogannoncelocations}


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

export default PremiumUserBlogannonceLocation;
