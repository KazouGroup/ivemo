import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import {Button, CardBody, Form, FormGroup, Input, InputGroup, Row} from "reactstrap";
import NavPremiumUserEmployement from "./NavPremiumUserEmployement";
import PremiumUserEmployementMessageList from "./inc/PremiumUserEmployementMessageList";
import LoaderLdsDefaultPage from "../../inc/annimation/LoaderLdsDefaultPage";
const abbrev = ['', 'k', 'M', 'B', 'T'];




class PremiumUserEmployementMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employment:{categoryemployment:[],user:{profile:[]},city:[],contactuseremployments:{employment:[]}},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.readItem = this.readItem.bind(this);
    }



    readItem(item) {

        const url = route('personal_contactusersemployment_mails_active.site', [item.id]);
        dyaxios.get(url).then(() => {
            this.props.history.push(`/dashboard/premium/${$userIvemo.slug}/employments/show/${item.slug}/`);
        })

    }

    activeItem(id){

        let url = route('personal_contactusersemployment_mails_active.site',id);
        dyaxios.get(url).then(() => {
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

    unactiveItem(id){

        //Envoyer la requet au server
        let url = route('personal_contactusersemployment_mails_unactive.site',id);
        dyaxios.get(url).then(() => {
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

                const url = route('personal_employments_mails_delete.site',[id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Message suprimée avec success'
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
        let itemEmployment = this.props.match.params.employment;
        let url = route('api.employments_premium_message',[itemuser,itemEmployment]);
        fetch(url).then(res => res.json())
            .then((result) => {
                this.mydatatables();
                this.setState({employment: result});
            });
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {employment} = this.state;
        return (
            <>
                <Helmet title={`${employment.title || "Dashboard " + $userIvemo.first_name} - ${$name_site}`} />

                <PremiumVerticalNavUserSite {...this.props} />

                <div className="main-panel">

                    <PremiumHorizontalNavUserSite />

                    <div className="content">
                        <div className="container-fluid">

                            <NavPremiumUserEmployement/>

                            <div className="row">
                                <div className="col-md-12 expo">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-icon card-header-primary">
                                            <div className="card-icon">
                                                <i className="material-icons">dialpad</i>
                                            </div>
                                            <p className="card-category">
                                                <b>Postulant</b>
                                            </p>
                                            <h3 className="card-title" style={{ color: "red" }}>
                                                <b>{employment.contactuseremployments_count || "0"}</b>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">dialpad</i>
                                                <b>Postulants</b>
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
                                                        <b>{employment.title || "Annonces sur les offres d'empoi,service et formation"}</b>
                                                    </h4>
                                                    <p className="card-title">{employment.title || "Annonces sur les offres d'empoi,service et formation"}</p>
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
                                                <div className="text-right ml-auto">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/employments/`}
                                                          className="btn btn-secondary btn-just-icon btn-sm" title="Retour a vos annonces">
                                                        <i className="material-icons">arrow_back</i>
                                                    </Link>
                                                    <a target="_blank" href={`/employments/${employment.categoryemployment.slug}/${employment.city.slug}/${employment.slug}/`} title="Voir cette annonce" className="btn btn-warning btn-sm btn-just-icon">
                                                        <i className="material-icons">visibility</i>
                                                    </a>
                                                </div>

                                            </div>


                                            {employment.contactuseremployments.length >= 0 ?

                                                <div className="material-datatables">
                                                    <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing={0} width="100%" style={{width:"100%"}}>
                                                        <thead>
                                                        <tr>
                                                            <th><b>Nom</b></th>
                                                            <th><b>Email</b></th>
                                                            <th><b>Phone</b></th>
                                                            <th><b>Date</b></th>
                                                            <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                        </tr>
                                                        </thead>
                                                        <tfoot>
                                                        <tr>
                                                            <th>Nom</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Date</th>
                                                            <th className="text-right">Actions</th>
                                                        </tr>
                                                        </tfoot>
                                                        <tbody>

                                                        {employment.contactuseremployments.map((item) => (
                                                            <PremiumUserEmployementMessageList key={item.id} {...item} deleteItem={this.deleteItem} readItem={this.readItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>
                                                        ))}

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

export default PremiumUserEmployementMessage;
