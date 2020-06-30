import React, { Component, Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import { Button } from "reactstrap";
import PremiumUserBlogannonceList from "./PremiumUserBlogannonceList";
import LoaderLdsDefaultPage from "../../inc/annimation/LoaderLdsDefaultPage";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class PremiumUserBlogannonceReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncereservations_count: [],
            blogannoncereservationsactive_count: [],
            blogannoncereservationsunactive_count: [],
            userblogannonce: {user:[],categoryannoncereservation:[]},

        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    activeItem(id) {
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
                let url = route('blogannoncecategoryreservationactivated_site', id);
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
                                enter: "animate__animated animate__fadeInUp",
                                exit: "animate__animated animate__fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    unactiveItem(id) {
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
                let url = route('blogannoncecategoryreservationunactivated_site', id);
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
                                enter: "animate__animated animate__fadeInUp",
                                exit: "animate__animated animate__fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir exècuter cette action?",
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
                this.setState({ userblogannonce: updatedItems });

                const url = route('blogannoncecategoryreservationdelete_site', [id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Article supprimée avec succès'
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
                    $.notify("Ooops! Une erreur est survenue", {
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

    mydatatables() {
        $(function () {
            $('#datatables').DataTable({
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                responsive: true,
                retrieve:true,
                destroy: true,
                colReorder: true,
                language: {
                    search: "<i class='material-icons'>search</i>",
                    searchPlaceholder: "Search Record"
                },
                sPaginationType: "full_numbers"

            });
        });
    }

    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.blogannoncereservations_premium_count', [itemuser])).then(response => {
            this.setState({ blogannoncereservations_count: response.data })
        });
        dyaxios.get(route('api.blogannoncereservations_premiumactive_count', [itemuser])).then(response => {
            this.setState({ blogannoncereservationsactive_count: response.data })
        });
        dyaxios.get(route('api.blogannoncereservations_premiumunactive_count', [itemuser])).then(response => {
            this.setState({ blogannoncereservationsunactive_count: response.data })
        });

        dyaxios.get(route('api.blogannoncereservations_premium',[itemuser])).then(response => {
            this.mydatatables();
            this.setState({userblogannonce: response.data})
        });
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    data_countFormatter(blogannoncereservations_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncereservations_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncereservations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(blogannoncereservationsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncereservationsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncereservationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(blogannoncereservationsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncereservationsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncereservationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const { userblogannonce, blogannoncereservations_count,blogannoncereservationsactive_count,blogannoncereservationsunactive_count } = this.state;
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} article de blog reservations - ${$name_site}`} />

                <PremiumVerticalNavUserSite {...this.props} />

                <div className="main-panel">

                    <PremiumHorizontalNavUserSite />

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-primary card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">view_headline</i>
                                            </div>
                                            <p className="card-category"><b>Articles</b></p>
                                            <h3 className="card-title"><b>{this.data_countFormatter(blogannoncereservations_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">view_headline</i> Articles sur les
                                                annonces reservations
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-success card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">done</i>
                                            </div>
                                            <p className="card-category"><b>Activés</b></p>
                                            <h3 className="card-title"><b>{this.dataactive_countFormatter(blogannoncereservationsactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">done</i> Articles activés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-danger card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">remove</i>
                                            </div>
                                            <p className="card-category"><b>Déactivés</b></p>
                                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(blogannoncereservationsunactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">remove</i> Articles déactivés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 expo">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-icon card-header-primary">
                                            <div className="card-icon">
                                                <i className="material-icons">view_headline</i>
                                            </div>
                                            <p className="card-category">
                                                <b>Articles sur les annonces reservations</b>
                                            </p>
                                            <h3 className="card-title" style={{ color: "red" }}>
                                                <b>{this.data_countFormatter(blogannoncereservations_count)}</b>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">view_headline</i>
                                                <b>Articles sur les annonces reservations</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-primary">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4 className="card-title">
                                                    <b>Articles sur les annonces reservations</b>
                                                </h4>
                                                <p className="card-title">Articles sur les annonces reservations</p>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <span>
                                                    <i id="tooltipSize" className="material-icons">view_headline</i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="toolbar">
                                            <div className="text-center">
                                                <div className="submit text-center">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_reservations/create/`}
                                                          className="btn btn-primary btn-raised ">
                                                         <span className="btn-label">
                                                           <i className="material-icons">add</i>
                                                         </span>
                                                        <b className="title_hover">Poster votre article sur la reservation</b>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {userblogannonce.length >= 0 ?
                                            <div className="material-datatables">
                                                <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing={0} width="100%" style={{width:"100%"}}>
                                                    <thead>
                                                    <tr>
                                                        <th><b>Image</b></th>
                                                        <th><b>Titre</b></th>
                                                        <th><b>Catégorie</b></th>
                                                        <th><b>Vue</b></th>
                                                        <th><b>Status</b></th>
                                                        <th><b>Date</b></th>
                                                        <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Titre</th>
                                                        <th>Catégorie</th>
                                                        <th>Vue</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    { userblogannonce.map(item => (
                                                            <PremiumUserBlogannonceList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem} />)
                                                    )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            :
                                            <LoaderLdsDefaultPage/>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterPremiumUser />

            </div>

            </>

        )
    }
}

export default PremiumUserBlogannonceReservation;
