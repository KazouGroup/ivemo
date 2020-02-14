import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import Categoriesannoncereservation from "../annoncereservation/inc/Categoriesannoncereservation";


class Profileannoncesreservationsbooked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncesreservationsbookeds:{annoncereservation:[],user:[]},
        };
        this.confirmItem = this.confirmItem.bind(this);
        this.unconfirmItem = this.unconfirmItem.bind(this);
    }
    confirmItem(item){
        Swal.fire({
            title: 'Confirmer la reservation?',
            text: "êtes vous sure de vouloir confirmer cette reservation? Un email de confirmation serrà envoyé à l'utilisateur",
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
                let url = route('annonces_reservations_booked_confirmed.site',[item.id]);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'Reservation confirmée avec succès'
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

    unconfirmItem(item){
        Swal.fire({
            title: 'Annullé la reservation?',
            text: "êtes vous sure de vouloir annuller cette reservation?",
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
                let url = route('annonces_reservations_booked_unconfirmed.site',[item.id]);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            message: 'Reservation annullé avec succès'
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

    mydatatables(){
        $( function () {
            $('#datatable').DataTable({
                "pagingType": "full_numbers",
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                },
                responsive: true,
                destroy: true,
                retrieve:true,
                autoFill: true,
                colReorder: true,
                "sPaginationType": "full_numbers",

            });
        });
    }

    loadItems() {
        fetch(route('api.annonces_bookeds.site')).then(res => res.json())
            .then((result) => {
                this.setState({
                    annoncesreservationsbookeds: result
                });
                this.mydatatables();
            }, (error) => {
                this.setState({
                    error
                });
            })
    }
    reload(){
        this.loadItems()
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }

    render() {
        const {annoncesreservationsbookeds} = this.state;

        return (

            <>
                <Helmet>
                    <title>Reservations {`${$userIvemo.first_name}`} - Ivemo</title>
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


                                    <div className="col-lg-3 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Ajouter une reservation</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Categoriesannoncereservation/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="col-lg-9 col-md-12 mx-auto">

                                        <div className="card">

                                            <div className="card-body">
                                                <div className="toolbar">
                                                    <div className="header text-right">
                                                        <button onClick={() => this.reload()}
                                                                className="btn btn-success btn-raised btn-sm"
                                                                title="Refresh Page">
                                                            <i className="now-ui-icons loader_refresh"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <table id="datatable" className="table table-striped table-bordered"
                                                       cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th><b>Titre</b></th>
                                                        <th><b>Type</b></th>
                                                        <th><b>Email</b></th>
                                                        <th><b>Periode</b></th>
                                                        <th><b>Status</b></th>
                                                        <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Titre</th>
                                                        <th>Type</th>
                                                        <th>Email</th>
                                                        <th>Periode</th>
                                                        <th>Status</th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                    {annoncesreservationsbookeds.length >= 0 && (
                                                        <>
                                                            {annoncesreservationsbookeds.map((item) =>(
                                                                <tr key={item.id}>
                                                                    <td>{(item.annoncereservation.title.length > 10 ? item.annoncereservation.title.substring(0, 10) + "..." : item.annoncereservation.title)}</td>
                                                                    <td>{item.annoncereservation.categoryannoncereservation.name}</td>
                                                                    <td>{(item.email.length > 10 ? item.email.substring(0, 10) + "..." : item.email)}</td>
                                                                    <td><b>13/11/2019 </b>au <b>11/09/2020</b></td>
                                                                    <td>
                                                                        <div className="timeline-heading">
                                                                            {item.status ?
                                                                                <span
                                                                                    className="badge badge-success"><b>Confirmée</b></span>
                                                                                :
                                                                                <span
                                                                                    className="badge badge-danger"><b>En attente</b></span>
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        {item.status ?
                                                                            <button type="button" rel="tooltip" onClick={() => this.unconfirmItem(item)}
                                                                                    className="btn btn-success btn-icon btn-sm"
                                                                                    data-original-title="Reservation confirmée" title="Reservation confirmée">
                                                                                <i className="now-ui-icons ui-1_check"/>
                                                                            </button>
                                                                            :
                                                                            <button type="button" rel="tooltip" onClick={() => this.confirmItem(item)}
                                                                                    className="btn btn-danger btn-icon btn-sm"
                                                                                    data-original-title="Reservation en attente de confirmation" title="Reservation en attente de confirmation">
                                                                                <i className="now-ui-icons ui-1_simple-delete"/>
                                                                            </button>
                                                                        }

                                                                        <button type="button" rel="tooltip" data-toggle="modal" data-target="#showreservation"
                                                                                className="btn btn-warning btn-icon btn-sm   btn-neutral  "
                                                                                data-original-title="Voir cette reservation" title="">
                                                                            <i className="now-ui-icons education_glasses"/>
                                                                        </button>
                                                                        <button type="button" rel="tooltip"
                                                                                className="btn btn-danger btn-icon btn-sm   btn-neutral  "
                                                                                data-original-title="" title="">
                                                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    )}




                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>

                                        <div className="modal fade showreservation" id="showreservation" tabIndex="-1" role="dialog"
                                             aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLongTitle">Modal
                                                            title</h5>
                                                        <button type="button" className="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        ...
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary"
                                                                data-dismiss="modal">Close
                                                        </button>
                                                        <button type="button" className="btn btn-primary">Save changes
                                                        </button>
                                                    </div>
                                                </div>
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
Profileannoncesreservationsbooked.defaultProps = {
    backgroundColor: "black",
};

Profileannoncesreservationsbooked.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default Profileannoncesreservationsbooked;
