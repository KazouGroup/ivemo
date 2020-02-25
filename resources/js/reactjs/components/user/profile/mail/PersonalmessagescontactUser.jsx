import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import NavlinkmailmessageUser from "./inc/NavlinkmailmessageUser";
import HeadermailmessageUser from "./inc/HeadermailmessageUser";
import { NavLink } from "react-router-dom";
import NavNavigatePivateUser from "../NavNavigatePivateUser";


class PersonalmessagescontactUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactusersprofile: {contactusers:[]},
            visiable: 10,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.readItem = this.readItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 10 }
        })
    }


    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.personal_mails_contacts.site', [itemuser])).then(response => this.setState({ contactusersprofile: response.data, }));
    }
    readItem(item) {

        const url = route('personal_mails_contacts_active.site', [item.id]);
        dyaxios.get(url).then(() => {
            this.props.history.push(`/profile/personal_mails/contacts/${item.slug}/`);
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

                const url = route('personal_mails_delete.site', id);
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
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }


    render() {
        const { contactusersprofile, visiable } = this.state;
        const mapContactusers = contactusersprofile.contactusers.length ? (
            contactusersprofile.contactusers.slice(0, visiable).map(item => {
                return (

                    <HeadermailmessageUser key={item.id} {...item} readItem={this.readItem} deleteItem={this.deleteItem} />
                )
            })
        ) : (
                <></>
            );


        return (

            <>
                <Helmet>
                    <title>Messages contact {`${$userIvemo.first_name}`} - Ivemo</title>
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

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <NavlinkmailmessageUser {...this.props} {...contactusersprofile}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ici c'est la navigation dans toutes les pages dans le profile*/}
                                        <NavNavigatePivateUser />

                                    </div>


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card">

                                            <div className="card-body">
                                                <table>
                                                    <tbody>

                                                        {mapContactusers}

                                                    </tbody>
                                                </table>
                                            </div>


                                        {visiable < contactusersprofile.contactusers.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-secondary btn-block">
                                                        <b>Voir plus </b>
                                                        <i className="now-ui-icons arrows-1_minimal-down" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
export default PersonalmessagescontactUser;
