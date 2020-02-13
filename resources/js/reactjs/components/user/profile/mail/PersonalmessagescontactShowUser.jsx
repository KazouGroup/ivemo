import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import moment from "moment";
import { Remarkable } from "remarkable";
import FootermailmessageUser from "./inc/FootermailmessageUser";
import NavlinkmailmessageUser from "./inc/NavlinkmailmessageUser";


class PersonalmessagescontactShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactuser:[],
        };

        this.deleteItem = this.deleteItem.bind(this);
    }


    loadItem() {
        let itemcontactuser = this.props.match.params.contactuser;
        let url = route('api.personal_mails_contacts_show.site', [itemcontactuser]);
        dyaxios.get(url).then(response => this.setState({ contactuser: response.data, }));
    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes vous sure de vouloir executer cette action",
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

                const url = route('personal_mails_delete.site',id);
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
                    this.props.history.push('/profile/personal_mails/contacts/');

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
        this.loadItem();

    }

    getDescription(contactuser) {
        const md = new Remarkable();
        return { __html: md.render(contactuser.message) };
    }

    render() {
        const {contactuser} = this.state;
        return (

            <>
                <Helmet>
                    <title>{`${contactuser.subject}`} {`${$userIvemo.first_name}`} - Ivemo</title>
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


                                    <NavlinkmailmessageUser />





                                    <div className="col-lg-8 col-md-12 mx-auto">


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card card-plain card-blog">
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="text-left pull-left">
                                                            <h5 className="ml-auto mr-auto">
                                                                <b>{contactuser.subject} </b>
                                                            </h5>
                                                            <small className="ml-auto mr-auto">
                                                            </small>
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <h6 className="ml-auto mr-auto">
                                                                <strong>{moment(contactuser.created_at).format('DD/MM/YYYY')}</strong>
                                                            </h6>

                                                        </div>
                                                    </div>


                                                    <div className="title mb-2 text-justify" dangerouslySetInnerHTML={this.getDescription(contactuser)} />
                                                    <hr />
                                                    <div className="media-footer">
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <div className="ml-auto mr-auto">
                                                                    <b>{contactuser.email} </b>
                                                                </div>
                                                                <small className="ml-auto mr-auto">
                                                                </small>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <div className="ml-auto mr-auto">
                                                                    <strong>{contactuser.full_name}</strong>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <a href={`mailto:${contactuser.email}`} className="btn btn-primary pull-left">
                                                            <i className="now-ui-icons text_caps-small" />
                                                            Répondre
                                                        </a>
                                                        {contactuser.phone ?
                                                                <a href={`tel:${contactuser.phone}`} rel="tooltip" title={contactuser.phone} data-placement="bottom" className="btn btn-success pull-left">
                                                                    <i className="now-ui-icons tech_mobile" />
                                                                    Phone
                                                                </a>:null}

                                                        <Button onClick={() => this.deleteItem(contactuser.id)}
                                                                className="btn btn-danger pull-left" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                            <i className="now-ui-icons ui-1_simple-remove" />
                                                            Supprimer
                                                        </Button>{" "}
                                                    </div>

                                                </div>

                                                <FootermailmessageUser />

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
export default withRouter(PersonalmessagescontactShowUser);
