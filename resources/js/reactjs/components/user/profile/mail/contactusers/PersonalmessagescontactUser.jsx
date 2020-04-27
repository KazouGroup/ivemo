import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import NavlinkmailmessageUser from "../inc/NavlinkmailmessageUser";
import HeadermailmessageUser from "../inc/HeadermailmessageUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";


class PersonalmessagescontactUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactusersprofile: {contactusers:[]},
            isLoading: false,
            visiable: 20,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.readItem = this.readItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.archvementItem = this.archvementItem.bind(this);
        this.unarchvementItem = this.unarchvementItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 20 }
        })
    }

    unfavoriteItem(id){
        const url = route('personal_contactusers_mails_unfavorite.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItems();
        })
    }

    favoriteItem(id){
        const url = route('personal_contactusers_mails_favorite.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItems();
        })
    }

    loadItems() {
        this.setState({ isLoading: true });
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.personal_mails_contacts.site', [itemuser])).then(response => this.setState({ contactusersprofile: response.data,isLoading: false, }));
    }

    activeItem(id) {
        const url = route('personal_contactusers_mails_active.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItems();
        })
    }

    unactiveItem(id) {
        const url = route('personal_contactusers_mails_unactive.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItems();
        })
    }

    readItem(item) {

        const url = route('personal_contactusers_mails_unactive.site', [item.id]);
        dyaxios.get(url).then(() => {
            this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/contacts/${item.slug}/`);
        })

    }

    unarchvementItem(id){
        const url = route('personal_contactusers_mails_unarchvement.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItems();
        })
    }

    archvementItem(id){
        const url = route('personal_contactusers_mails_archvement.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItems();
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

                const url = route('personal_contactusers_mails_delete.site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    this.loadItems();
                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Message supprimé avec succès'
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

                    <HeadermailmessageUser key={item.id} {...item} readItem={this.readItem} deleteItem={this.deleteItem}
                        activeItem={this.activeItem} unactiveItem={this.unactiveItem}
                        archvementItem={this.archvementItem} unarchvementItem={this.unarchvementItem}
                        unfavoriteItem={this.unfavoriteItem} favoriteItem={this.favoriteItem} />
                )
            })
        ) : (
            <></>
        );

        return (

            <>
                <Helmet>
                    <title>Messages contact {`${$userIvemo.first_name}`} - {$name_site}</title>
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

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-body">
                                                                <table>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td> <NavLink to={`/profile/${contactusersprofile.slug}/personal_mails/archvement_contacts/`}>{contactusersprofile.archvementcontactusers_count > 1 ? "Messages archivés" : "Message archivé"}</NavLink></td>
                                                                        <td className="text-right"> {contactusersprofile.archvementcontactusers_count} {contactusersprofile.archvementcontactusers_count > 1 ? "messages" : "message"}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td> <NavLink to={`/profile/${contactusersprofile.slug}/personal_mails/favorite_contacts/`}>{contactusersprofile.favoritecontactusers_count > 1 ? "Messages suivis" : "Message suivis"}</NavLink></td>
                                                                        <td className="text-right"> {contactusersprofile.favoritecontactusers_count} {contactusersprofile.favoritecontactusers_count > 1 ? "messages" : "message"}</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>

                                        </div>

                                    </div>


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="alert alert-info" role="alert">
                                            <div className="container text-center">
                                                <strong>Boite de réception</strong>
                                            </div>
                                        </div>

                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

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



                        </div>

                        <FooterBigUserSite />

                    </div>
                </div>


            </>

        )
    }
}
export default PersonalmessagescontactUser;