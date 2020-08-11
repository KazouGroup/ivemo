import React, { PureComponent } from "react";
import { Helmet } from 'react-helmet';
import {CardBody, Form, FormGroup, Input, InputGroup, Row} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";
import HeaderProfileAccountPrivate from "./HeaderProfileAccountPrivate";
import FieldInput from "../../../inc/vendor/FieldInput";
import FieldInputCheck from "../../../inc/vendor/FieldInputCheck";


class ProfileConfigUser extends PureComponent {
    constructor(props) {
        super(props);

        this.updateItem = this.updateItem.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.handleStatusTeamUser = this.handleStatusTeamUser.bind(this);
        this.handleStatusAnnonceLocation = this.handleStatusAnnonceLocation.bind(this);
        this.handleStatusAnnonceReservation = this.handleStatusAnnonceReservation.bind(this);
        this.handleStatusAnnonceVente = this.handleStatusAnnonceVente.bind(this);
        this.handleStatusEmployments = this.handleStatusEmployments.bind(this);
        this.handleStatusComments = this.handleStatusComments.bind(this);
        this.handleStatusResponseComments = this.handleStatusResponseComments.bind(this);
        this.handleStatusContactService = this.handleStatusContactService.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.state = {
            facebook_link: '',
            twitter_link: '',
            youtube_link: '',
            address: '',
            instagram_link: '',
            city_id: '',
            linkedin_link: '',
            birthdate: '',
            site_internet: '',
            status_avis: '',
            status_team_user: '',
            status_annonce_locations: '',
            status_annonce_reservations: '',
            status_annonce_ventes: '',
            status_employments: '',
            status_comments: '',
            status_responsecomments: '',
            handleStatusContactService: '',
            categoryprofile_id: '',
            description: '',
            cities: [],
            categoryprofiles: [],
            errors: [],
        };
        this.modules = {
            toolbar: [
                [{'size': ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'align': []}],
                [{'color': []}, {'background': []}],
                ['link']
            ]
        };
        this.formats = [
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background',
            'link',
        ];
    }

    // Handle Change
    handleChangeBody(value) {
        this.setState({description: value});
        document.querySelector('.editor-control').classList.remove('is-invalid');
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    handleCheckClick() {
        this.setState({status_avis: !this.state.status_avis});
    };

    handleStatusTeamUser() {
        this.setState({status_team_user: !this.state.status_team_user});
    };

    handleStatusAnnonceLocation() {
        this.setState({status_annonce_locations: !this.state.status_annonce_locations});
    };

    handleStatusAnnonceReservation() {
        this.setState({status_annonce_reservations: !this.state.status_annonce_reservations});
    };

    handleStatusAnnonceVente() {
        this.setState({status_annonce_ventes: !this.state.status_annonce_ventes});
    };

    handleStatusEmployments() {
        this.setState({status_employments: !this.state.status_employments});
    };

    handleStatusComments() {
        this.setState({status_comments: !this.state.status_comments});
    };

    handleStatusResponseComments() {
        this.setState({status_responsecomments: !this.state.status_responsecomments});
    };

    handleStatusContactService() {
        this.setState({status_contactservice: !this.state.status_contactservice});
    };

    // Handle Errors
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    updateItem(e) {
        let itemprofile = this.props.match.params.profile;
        e.preventDefault();

        let item = {
            facebook_link: this.state.facebook_link,
            twitter_link: this.state.twitter_link,
            youtube_link: this.state.youtube_link,
            instagram_link: this.state.instagram_link,
            categoryprofile_id: this.state.categoryprofile_id,
            city_id: this.state.city_id,
            address: this.state.address,
            linkedin_link: this.state.linkedin_link,
            birthdate: this.state.birthdate,
            status_avis: this.state.status_avis,
            status_team_user: this.state.status_team_user,
            status_annonce_locations: this.state.status_annonce_locations,
            status_annonce_reservations: this.state.status_annonce_reservations,
            status_annonce_ventes: this.state.status_annonce_ventes,
            status_employments: this.state.status_employments,
            status_comments: this.state.status_comments,
            status_responsecomments: this.state.status_responsecomments,
            status_contactservice: this.state.status_contactservice,
            site_internet: this.state.site_internet,
            description: this.state.description,
        };
        dyaxios.put(route('profile_add_info_account.update', [itemprofile]), item)
            .then(() => {
                $.notify({message: 'Votre profil a été mis à jour avec succés.'},
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        },
                    });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooopss! Something wrong. Try later...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        });
    }

    loadItem() {
        dyaxios.get(route('api.categoryprofiles')).then(response => this.setState({categoryprofiles: response.data,}));
        dyaxios.get(route('api.all_cities')).then(response => this.setState({cities: response.data,}));
        const itemprofile = this.props.match.params.profile;
        dyaxios.get(route('api_profile_add_info_account.site', [itemprofile])).then(response =>
            this.setState({
                facebook_link: response.data.facebook_link,
                twitter_link: response.data.twitter_link,
                youtube_link: response.data.youtube_link,
                instagram_link: response.data.instagram_link,
                categoryprofile_id: response.data.categoryprofile_id,
                city_id: response.data.city_id,
                linkedin_link: response.data.linkedin_link,
                birthdate: response.data.birthdate,
                address: response.data.address,
                status_avis: response.data.status_avis,
                status_team_user: response.data.status_team_user,
                status_annonce_locations: response.data.status_annonce_locations,
                status_annonce_reservations: response.data.status_annonce_reservation,
                status_annonce_ventes: response.data.status_annonce_ventes,
                status_employments: response.data.status_employments,
                status_comments: response.data.status_comments,
                status_responsecomments: response.data.status_responsecomments,
                status_contactservice: response.data.status_contactservice,
                site_internet: response.data.site_internet,
                description: response.data.description,
            }));
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItem();
    }

    render() {
        const {categoryprofiles, cities} = this.state;
        return (
            <>
                <Helmet>
                    <title> {`${$userIvemo.first_name || "Profile"}`} - {$name_site}</title>
                </Helmet>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite/>
                    </nav>
                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br/>
                                <Form role="form" id="contact-form" onSubmit={this.updateItem} acceptCharset="UTF-8">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 mx-auto">
                                            <NavProfileAccountPrivate/>
                                        </div>
                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="card">
                                                <CardBody>
                                                    <HeaderProfileAccountPrivate/>
                                                    <hr/>
                                                    <Row className="my-4">
                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="address"><b>Adresse de Résidence</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons users_circle-08"/>
                                                                    </span>
                                                                </div>
                                                                <FieldInput name="address" type='text' minLength="4" maxLength="200"
                                                                            placeholder="Entrez votre adresse de résidence" value={this.state.address || ""}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="url_site"><b>Site Internet</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons objects_globe"/>
                                                                    </span>
                                                                </div>
                                                                <FieldInput name="site_internet" type='url' minLength="4" maxLength="200"
                                                                            placeholder="https://www.ivemo.com" value={this.state.site_internet || ""}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row className="my-4">
                                                    {/*

                                                        <div className="col-md-4">
                                                            <label htmlFor="birthdate"><b>Date de Naissance</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons objects_globe"/>
                                                                    </span>
                                                                </div>


                                                                  <input id='birthdate'
                                                                       type='date'
                                                                       value={this.state.birthdate || ''}
                                                                       className={`form-control form-control-date ${this.hasErrorFor('birthdate') ? 'is-invalid' : ''}`}
                                                                       onChange={this.handleFieldChange}
                                                                       placeholder="Date de Naissance"
                                                                       name='birthdate'
                                                                       required="required"
                                                                />
                                                                {this.renderErrorFor('birthdate')}

                                                            </div>
                                                        </div>
                                                    */}

                                                        <div className="col-md-3">
                                                            <label htmlFor="city_id"><b>Votre Ville</b></label>
                                                            <div className="form-group">
                                                                <select value={this.state.city_id || ''}
                                                                        className={`form-control ${this.hasErrorFor('city_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="city_id"
                                                                        required="required">
                                                                    <option disabled hidden defaultValue value="">Votre
                                                                        ville
                                                                    </option>
                                                                    {cities.map((item) => (
                                                                        <option key={item.id}
                                                                                value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('city_id')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <label htmlFor="categoryprofile_id"><b>Pourquoi êtes-vous
                                                                sur Ivemo ?</b></label>
                                                            <div className="form-group">
                                                                <select value={this.state.categoryprofile_id || ''}
                                                                        className={`form-control ${this.hasErrorFor('categoryprofile_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange}
                                                                        name="categoryprofile_id" required="required">
                                                                    <option disabled hidden defaultValue value="">Pourquoi
                                                                        êtes-vous sur
                                                                        Ivemo
                                                                    </option>
                                                                    {categoryprofiles.map((item) => (
                                                                        <option key={item.id}
                                                                                value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('categoryprofile_id')}
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row className="my-4">
                                                        <div className="col-md-12">
                                                            <label
                                                                htmlFor="description"><b>Description <span
                                                                className="text-danger">*</span> </b></label>
                                                            <FormGroup>
                                                                <FieldInput name="description" type='textarea' minLength="4" rows="17"
                                                                            placeholder="Donner une description..." value={this.state.description || ""}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>
                                                            </FormGroup>
                                                        </div>
                                                    </Row>

                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingDue">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseDue" aria-expanded="false"
                                                                   aria-controls="collapseDue">
                                                                    <b>Site Internet et Rèseaux Sociaux</b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseDue" className="collapse" role="tabpanel"
                                                                 aria-labelledby="headingDue">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">
                                                                                <div className="row mb-4">
                                                                                    <div className="col-md-6 col-6">
                                                                                        <label htmlFor="url_site"><b>Site
                                                                                            Internet</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span
                                                                                                    className="input-group-text">
                                                                                                    <i className="now-ui-icons objects_globe"/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <FieldInput name="site_internet" type='url' minLength="4" maxLength="200"
                                                                                                        placeholder="https://www.ivemo.com" value={this.state.site_internet || ""}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 col-6">
                                                                                        <label
                                                                                            htmlFor="url_site"><b>Twitter </b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span
                                                                                                    className="input-group-text">
                                                                                                    <i className="now-ui-icons objects_globe"/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <FieldInput name="twitter_link" type='text' minLength="4" maxLength="200"
                                                                                                        placeholder="Lien de profil" value={this.state.twitter_link || ""}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mb-4">
                                                                                    <div className="col-md-6">
                                                                                        <label
                                                                                            htmlFor="url_site"><b>Linkedin</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span
                                                                                                    className="input-group-text">
                                                                                                    <i className="now-ui-icons objects_globe"/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <FieldInput name="linkedin_link" type='text' minLength="4" maxLength="200"
                                                                                                        placeholder="Linkedin profil" value={this.state.linkedin_link || ""}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <label
                                                                                            htmlFor="url_site"><b>Instagram</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span
                                                                                                    className="input-group-text">
                                                                                                    <i className="now-ui-icons objects_globe"/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <FieldInput name="instagram_link" type='text' minLength="4" maxLength="200"
                                                                                                        placeholder="Lien profil" value={this.state.instagram_link || ""}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mb-4">
                                                                                    <div className="col-md-6">
                                                                                        <label
                                                                                            htmlFor="title"><b>Facebook</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span
                                                                                                    className="input-group-text">
                                                                                                    <i className="now-ui-icons objects_globe"/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <FieldInput name="facebook_link" type='text' minLength="4" maxLength="200"
                                                                                                        placeholder="Lien profile ou page facebook" value={this.state.facebook_link || ""}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <label
                                                                                            htmlFor="title"><b>Youtube</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span
                                                                                                    className="input-group-text">
                                                                                                    <i className="now-ui-icons objects_globe"/>
                                                                                                </span>
                                                                                            </div>

                                                                                            <FieldInput name="youtube_link" type='text' minLength="4" maxLength="200"
                                                                                                        placeholder="Lien chain youtube" value={this.state.youtube_link || ""}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTre">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseTre" aria-expanded="false"
                                                                   aria-controls="collapseTre">
                                                                    <b>Notifications et Status</b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTre" className="collapse" role="tabpanel"
                                                                 aria-labelledby="headingTre">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <FieldInputCheck name="status_avis"
                                                                                                         type='checkbox'
                                                                                                         namecheck="Affichez ou masquez les avis des utilisateurs"
                                                                                                         checked={this.state.status_avis || false}
                                                                                                         value={this.state.status_avis}
                                                                                                         onChange={this.handleCheckClick}/>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">

                                                                                        <FieldInputCheck name="status_team_user"
                                                                                                         type='checkbox'
                                                                                                         namecheck="Affichez ou masquez votre team"
                                                                                                         checked={this.state.status_team_user || false}
                                                                                                         value={this.state.status_team_user}
                                                                                                         onChange={this.handleStatusTeamUser}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">

                                                                                        <FieldInputCheck name="status_annonce_locations"
                                                                                                         type='checkbox'
                                                                                                         namecheck="Affichez ou masquez vos annonces de locations"
                                                                                                         checked={this.state.status_annonce_locations || false}
                                                                                                         value={this.state.status_annonce_locations}
                                                                                                         onChange={this.handleStatusAnnonceLocation}/>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">

                                                                                        <FieldInputCheck name="status_annonce_reservations"
                                                                                                         type='checkbox'
                                                                                                         namecheck="Affichez ou masquez vos annonces en réservations"
                                                                                                         checked={this.state.status_annonce_reservations || false}
                                                                                                         value={this.state.status_annonce_reservations}
                                                                                                         onChange={this.handleStatusAnnonceReservation}/>

                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">

                                                                                        <FieldInputCheck name="status_annonce_reservations"
                                                                                                         type='checkbox'
                                                                                                         namecheck="Affichez ou masquez vos annonces de ventes"
                                                                                                         checked={this.state.status_annonce_ventes || false}
                                                                                                         value={this.state.status_annonce_ventes}
                                                                                                         onChange={this.handleStatusAnnonceVente}/>

                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">

                                                                                        <FieldInputCheck name="status_employments"
                                                                                                         type='checkbox'
                                                                                                         namecheck="Affichez ou masquez vos offres d'emplois"
                                                                                                         checked={this.state.status_employments || false}
                                                                                                         value={this.state.status_employments}
                                                                                                         onChange={this.handleStatusEmployments}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">

                                                                                        <FieldInputCheck name="status_comments"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Notifications des commentaires ${this.state.status_comments ? "activés" : "désactivés"}`}
                                                                                                         checked={this.state.status_comments || false}
                                                                                                         value={this.state.status_comments}
                                                                                                         onChange={this.handleStatusComments}/>

                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">

                                                                                        <FieldInputCheck name="status_responsecomments"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Notifications sur les réponses de vos commentaires
                                                                                                         ${this.state.status_responsecomments ? "activés" : "désactivés"}`}
                                                                                                         checked={this.state.status_responsecomments || false}
                                                                                                         value={this.state.status_responsecomments}
                                                                                                         onChange={this.handleStatusComments}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6">

                                                                                        <FieldInputCheck name="status_contactservice"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Notifications sur vos offres
                                                                                                    d'emplois ${this.state.status_contactservice ? "activés" : "désactivés"}`}
                                                                                                         checked={this.state.status_contactservice || false}
                                                                                                         value={this.state.status_contactservice}
                                                                                                         onChange={this.handleStatusContactService}/>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="submit text-center">
                                                        <button className="btn btn-primary"
                                                                type="submit">
                                                            <b><i className="now-ui-icons ui-1_check "/> Enregistrer</b>
                                                        </button>
                                                    </div>
                                                </CardBody>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <FooterBigUserSite/>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfileConfigUser;
