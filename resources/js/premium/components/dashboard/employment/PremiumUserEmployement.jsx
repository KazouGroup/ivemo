import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import {Button} from "reactstrap";
import PremiumUserEmployementList from "./inc/PremiumUserEmployementList";
import LoaderLdsDefaultPage from "../../inc/annimation/LoaderLdsDefaultPage";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class PremiumUserEmployement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employments_count: [],
            employmentsactive_count: [],
            employmentsunactive_count: [],
            useremployment:{user:[],city:[],categoryemployment:[]},

        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    activeItem(id){
        Swal.fire({
            title: 'Afficher cette offre?',
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
                let url = route('employmentsactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette offre est désormais visible aux utilisateurs",
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
                    $.notify("Ooop! Something wrong. Try later", {
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

    unactiveItem(id){
        Swal.fire({
            title: 'Masquer cette Offre?',
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
                let url = route('employmentsunactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette Offre a été masquée aux utilisateurs",
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
                    $.notify("Ooop! Something wrong. Try later", {
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
            text: "êtes-vous sûr de vouloir executer cette action?",
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
                let updatedItems = this.state.useremployment.filter(isNotId);
                this.setState({useremployment: updatedItems});

                const url = route('employmentsdelete_site',[id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Offre suprimée avec succès'
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

   mydatatables(){
       $(function() {
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

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.employments_premium_count',[itemuser])).then(response =>
            this.setState({employments_count: response.data}));

        dyaxios.get(route('api.employments_premiumactive_count',[itemuser])).then(response => {
            this.setState({employmentsactive_count: response.data})});

        dyaxios.get(route('api.employments_premiumunactive_count',[itemuser])).then(response =>
            this.setState({employmentsunactive_count: response.data}));

        dyaxios.get(route('api.employments_premium',[itemuser])).then(response => {
            this.mydatatables();
            this.setState({useremployment: response.data})
        });
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    data_countFormatter(employments_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(employmentsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employmentsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(employmentsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employmentsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {useremployment,employments_count,employmentsactive_count,employmentsunactive_count} = this.state;
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} Formations & emplois - ${$name_site}`} />

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
                                                <i className="material-icons">dialpad</i>
                                            </div>
                                            <p className="card-category"><b>Offres d'emplois</b></p>
                                            <h3 className="card-title"><b>{this.data_countFormatter(employments_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">dialpad</i> Offres d'empoi,service et formations
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
                                            <p className="card-category"><b>Actives</b></p>
                                            <h3 className="card-title"><b>{this.dataactive_countFormatter(employmentsactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">done</i> Offres activées
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
                                            <p className="card-category"><b>Déactivées</b></p>
                                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(employmentsunactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">remove</i> Offres déactivées
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
                                                <i className="material-icons">dialpad</i>
                                            </div>
                                            <p className="card-category">
                                                <b>Offres d'emplois,services et formations</b>
                                            </p>
                                            <h3 className="card-title" style={{ color: "red" }}>
                                                <b>{this.data_countFormatter(employments_count)}</b>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">dialpad</i>
                                                <b>Offres d'emplois,services et formations</b>
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
                                                <div className="col-md-8">
                                                    <h4 className="card-title">
                                                        <b>Annonces sur les offres d'emplois,services et formation</b>
                                                    </h4>
                                                    <p className="card-title">Annonces sur les offres d'emploi,services et formation</p>
                                                </div>
                                                <div className="col-md-4 text-right">
                                                <span>
                                                    <i id="tooltipSize" className="material-icons">dialpad</i>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="toolbar">
                                                <div className="text-center">
                                                    <div className="submit text-center">
                                                        <Link to={`/dashboard/premium/${$userIvemo.slug}/employments/create/`}
                                                              className="btn btn-primary btn-raised ">
                                                             <span className="btn-label">
                                                               <i className="material-icons">add</i>
                                                             </span>
                                                            <b className="title_hover">Poster votre offre</b>
                                                        </Link>
                                                    </div>
                                                </div>

                                            </div>

                                            {useremployment.length >= 0 ?

                                                <div className="material-datatables">
                                                    <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing={0} width="100%" style={{width:"100%"}}>
                                                        <thead>
                                                        <tr>
                                                            <th><b>Image</b></th>
                                                            <th><b>Titre</b></th>
                                                            <th><b>Categorie</b></th>
                                                            <th><b>Vue</b></th>
                                                            <th><b>Messages</b></th>
                                                            <th><b>Price (FCFA)</b></th>
                                                            <th><b>Date</b></th>
                                                            <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                        </tr>
                                                        </thead>
                                                        <tfoot>
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Titre</th>
                                                            <th>Categorie</th>
                                                            <th>Vue</th>
                                                            <th>Messages</th>
                                                            <th>Price (FCFA)</th>
                                                            <th>Date</th>
                                                            <th className="text-right">Actions</th>
                                                        </tr>
                                                        </tfoot>
                                                        <tbody>

                                                        {useremployment.map((item) => (
                                                        <PremiumUserEmployementList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>
                                                        ))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                                :
                                                <LoaderLdsDefaultPage/>}

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

export default PremiumUserEmployement;
