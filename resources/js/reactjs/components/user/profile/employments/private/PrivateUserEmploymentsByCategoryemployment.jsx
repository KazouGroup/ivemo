import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../configurations/inc/NavlinkconfigurationUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import PrivateUserEmployementList from "../../../employment/inc/PrivateUserEmployementList";
import EmploymentListSkeleton from "../../../../inc/user/employment/EmploymentListSkeleton";
import Navemploymentsbyuser from "../../../employment/inc/Navemploymentsbyuser";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class PrivateUserEmploymentsByCategoryemployment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employments_count: [],
            employmentsactive_count: [],
            employmentsunactive_count: [],
            useremploymentsPrivate:{employments:{categoryemployment:[],user:[],city:[]}},
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
            title: 'Afficher cette annonce?',
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
                            message: "Cette annonce est desormais visible aux utilisateurs",
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
            title: 'Masquer cette annonce?',
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
                            message: "Cette annonce a été masquée aux utilisateurs",
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

                const url = route('employmentsdelete_site',[id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Annonce suprimée avec success'
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

    loadItems(){
        let itemuser = this.props.match.params.user;
        let itemcategoryemployment = this.props.match.params.categoryemployment;
        dyaxios.get(route('api.employments_premium_count',[itemuser])).then(response => this.setState({ employments_count: response.data, }));
        dyaxios.get(route('api.employments_premiumactive_count',[itemuser])).then(response => this.setState({ employmentsactive_count: response.data, }));
        dyaxios.get(route('api.employments_premiumunactive_count',[itemuser])).then(response => this.setState({ employmentsunactive_count: response.data, }));

        dyaxios.get(route('api.employmentsbyuserbycategoryemployment_site',[itemuser,itemcategoryemployment])).then(response => this.setState({useremploymentsPrivate: response.data,}));
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
        const {useremploymentsPrivate,visiable,employments_count,employmentsactive_count,employmentsunactive_count} = this.state;
        const mapEmployments = useremploymentsPrivate.employments.length >= 0 ? (
            useremploymentsPrivate.employments.slice(0,visiable).map(item => {
                return(
                    <PrivateUserEmployementList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <Helmet>
                    <title>Emplois, Formation & Services {`${$userIvemo.first_name || 'Profile'}`} - {$name_site}</title>
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

                                        <Navlinknewemployment/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navemploymentsbyuser/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <NavlinkconfigurationUser {...useremploymentsPrivate} />

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">

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
                                                    <h4 className="info-title"><b>{this.data_countFormatter(employments_count)}</b></h4>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-success icon-circle">
                                                        <i className="now-ui-icons ui-1_check"></i>
                                                    </div>
                                                    <h4 className="info-title"><b>{this.dataactive_countFormatter(employmentsactive_count)}</b></h4>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-primary icon-circle">
                                                        <i className="now-ui-icons ui-1_simple-delete"></i>
                                                    </div>
                                                    <h4 className="info-title"><b>{this.dataunactive_countFormatter(employmentsunactive_count)}</b></h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="submit text-left">
                                            <Link to={`/profile/${$userIvemo.slug}/personal_settings/employments/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos annonces</b>
                                            </Link>
                                        </div>

                                        {mapEmployments}

                                        {visiable < useremploymentsPrivate.employments.length && (
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

export default PrivateUserEmploymentsByCategoryemployment;
