import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../inc/FooterPremiumUser";
import {Button, CardBody, Form, FormGroup, Input, InputGroup, Row} from "reactstrap";
import NavPremiumUserEmployement from "./NavPremiumUserEmployement";
import ReactQuill from "react-quill";
import ReadMoreAndLess from "react-read-more-less";
import Skeleton from "react-loading-skeleton";
const abbrev = ['', 'k', 'M', 'B', 'T'];




class PremiumUserEmployementMessageShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactuseremployment:{employment:[],user:[]},
        };

        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }


    activeItem(id){

        let url = route('personal_contactusersemployment_mails_active.site',id);
        dyaxios.get(url).then(() => {
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

    unactiveItem(id){

        //Envoyer la requet au server
        let url = route('personal_contactusersemployment_mails_unactive.site',id);
        dyaxios.get(url).then(() => {
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

    deleteItem(contactuseremployment) {
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

                const url = route('personal_employments_mails_delete.site',[contactuseremployment.id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Offre supprimée avec succès'
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
                    this.props.history.push(`/dashboard/premium/${$userIvemo.slug}/employments/message/${contactuseremployment.employment.slug}/`);
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

    loadItems(){
        let itemuser = this.props.match.params.user;
        let itemContactuseremployment = this.props.match.params.contactuseremployment;
        let url = route('api.personal_mails_employments_show.site',[itemuser,itemContactuseremployment]);
        dyaxios.get(url).then(response =>
            this.setState({contactuseremployment: response.data}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {contactuseremployment} = this.state;
        return (
            <>
                <Helmet title={`${contactuseremployment.full_name  || "Dashboard " + $userIvemo.first_name} - ${$name_site}`} />

                <PremiumVerticalNavUserSite {...this.props} />

                <div className="main-panel">

                    <PremiumHorizontalNavUserSite />

                    <div className="content">
                        <div className="container-fluid">

                            <NavPremiumUserEmployement/>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-primary">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h4 className="card-title">
                                                        <b>{contactuseremployment.full_name}</b>
                                                    </h4>
                                                    <p className="card-title">{contactuseremployment.full_name}</p>
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
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/employments/message/${contactuseremployment.employment.slug}/`}
                                                          className="btn btn-secondary btn-just-icon btn-sm" title="Retour a vos offres">
                                                        <i className="material-icons">arrow_back</i>
                                                    </Link>
                                                    {contactuseremployment.status_red ?
                                                        <Button onClick={() => this.unactiveItem(contactuseremployment.id)}
                                                                className="btn btn-success btn-link btn-just-icon btn-sm" title="Déactiver" >
                                                            <i className="material-icons">done</i>
                                                        </Button>
                                                        :
                                                        <Button onClick={() => this.activeItem(contactuseremployment.id)}
                                                                className="btn btn-rose btn-link btn-just-icon btn-sm" title="Activer" >
                                                            <i className="material-icons">remove</i>
                                                        </Button>
                                                    }
                                                    <Button onClick={() => this.deleteItem(contactuseremployment)}
                                                            className="btn btn-danger btn-link btn-just-icon btn-sm" title="Supprimer cette offre">
                                                        <i className="material-icons">delete_forever</i>
                                                    </Button>
                                                </div>
                                            </div>

                                            <CardBody>

                                                <Row>
                                                    <div className="col-md-4">
                                                        <FormGroup>
                                                            <Input id='price'
                                                                   type='text'
                                                                   className={`form-control`}
                                                                   name='full_name'
                                                                   defaultValue={contactuseremployment.full_name || ""}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <FormGroup>
                                                            <Input id='district'
                                                                   type='email'
                                                                   placeholder="Email"
                                                                   className={`form-control`}
                                                                   defaultValue={contactuseremployment.email || ""}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <FormGroup>
                                                            <Input id='district'
                                                                   type='number'
                                                                   placeholder="Phone"
                                                                   className={`form-control`}
                                                                   defaultValue={contactuseremployment.phone || ""}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className="col-md-12 text-justify">
                                                        {contactuseremployment.message ?
                                                            <ReadMoreAndLess
                                                                className="read-more-content"
                                                                charLimit={250}
                                                                readMoreText="(Plus)"
                                                                readLessText=""
                                                            >
                                                                {contactuseremployment.message}
                                                            </ReadMoreAndLess>: <Skeleton count={2}/>}
                                                    </div>
                                                </Row>

                                            </CardBody>

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

export default PremiumUserEmployementMessageShow;
