import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../configurations/inc/NavlinkconfigurationUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import PrivateUserEmployementList from "../../../employment/inc/PrivateUserEmployementList";
import Navemploymentsbyuser from "../../../employment/inc/Navemploymentsbyuser";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
import HelmetSite from "../../../../inc/user/HelmetSite";
import Skeleton from "react-loading-skeleton";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class PrivateUserEmploymentsByStatistique extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremploymentsPrivate: [],
            employment:{categoryemployment:[],user:[],city:[]},
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
                    this.props.history.push(`/profile/${$userIvemo.slug}/personal_settings/employments/`);
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
        let itememployment = this.props.match.params.employment;

        dyaxios.get(route('api.employmentsbyuserbystatistiqueemployment_site',[itemuser,itememployment])).then(response => this.setState({employment: response.data,}));
        dyaxios.get(route('api.userblogs_and_annonces',[itemuser])).then(response => this.setState({useremploymentsPrivate: response.data,}));
    }

   // Lifecycle Component Method
    componentDidMount() {
        setInterval(() => {
            this.loadItems();
        }, 10000);
    }

    render() {
        const {useremploymentsPrivate,employment,visiable} = this.state;

        return (
            <>
                <HelmetSite title={`Emplois, Formation & Services ${$userIvemo.first_name || 'Profile'} - ${$name_site}`}/>

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

                                        <div className="submit text-left">
                                            <Link to={`/profile/${$userIvemo.slug}/personal_settings/employments/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos annonces</b>
                                            </Link>
                                        </div>

                                        {employment.title ?

                                            <>
                                                <PrivateUserEmployementList {...this.props} {...employment} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>

                                                <div className="card">
                                                    <div className="social-line social-line-big-icons">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <h5 className="info-title"><b>Total vues</b></h5>
                                                                    {employment.visits_count}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <h5 className="info-title"><b>Total messages</b></h5>
                                                                    {employment.contactuseremployments_count}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card">

                                                    <div className="card-body">
                                                        <div className="table-responsive">

                                                            <table className="table">
                                                                <thead className="">
                                                                <tr>
                                                                    <th>
                                                                        <b>Nom</b>
                                                                    </th>
                                                                    <th>
                                                                        <b>Email</b>
                                                                    </th>
                                                                    <th className="text-center">
                                                                        <b>Telephone</b>
                                                                    </th>
                                                                    <th className="text-right">
                                                                        <b>Actions</b>
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {employment.contactuseremployments.slice(0,visiable).map(item => (
                                                                    <tr key={item.id}>
                                                                        <td>
                                                                            <b>{item.full_name}</b>
                                                                        </td>
                                                                        <td>
                                                                            <b>{item.email}</b>
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <b>{item.phone}</b>
                                                                        </td>
                                                                        <td className="text-right">
                                                                            <button type="button" rel="tooltip"
                                                                                    className="btn btn-info btn-icon btn-sm "
                                                                                    data-original-title="" title="">
                                                                                <i className="now-ui-icons users_single-02"></i>
                                                                            </button>
                                                                            <button type="button" rel="tooltip"
                                                                                    className="btn btn-success btn-icon btn-sm "
                                                                                    data-original-title="" title="">
                                                                                <i className="now-ui-icons ui-2_settings-90"></i>
                                                                            </button>
                                                                            <button type="button" rel="tooltip"
                                                                                    className="btn btn-danger btn-icon btn-sm "
                                                                                    data-original-title="" title="">
                                                                                <i className="now-ui-icons ui-1_simple-remove"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}

                                                                </tbody>
                                                            </table>

                                                            {visiable < employment.contactuseremployments.length && (
                                                                <div className="row">
                                                                    <div className="col-md-4 ml-auto mr-auto text-center">
                                                                        <a style={{cursor:"pointer"}} onClick={this.loadmoresItem} className="text-info">
                                                                            <b>Voir plus</b>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>

                                            </>



                                            :
                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="card card-plain card-blog">
                                                        <div className="row">

                                                            <div className="col-md-8">

                            <span className="title">
                                <Skeleton width={250} />   <Skeleton width={80} /> <Skeleton width={60} />
                            </span>
                                                                <br/>
                                                                <Skeleton count={2}/>

                                                                <div className="card-footer">
                                                                    <Skeleton circle={false} height={40} width={80} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">

                                                                <div className="card-image">
                                                                    <Skeleton circle={false} height={123} width={186} />
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        }

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

export default PrivateUserEmploymentsByStatistique;
