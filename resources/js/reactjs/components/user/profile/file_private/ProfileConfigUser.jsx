import React, { PureComponent } from "react";
import { Helmet } from 'react-helmet';
import { CardBody, Form, FormGroup, Input, Row } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";
import HeaderProfileAccountPrivate from "./HeaderProfileAccountPrivate";


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
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
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
                                                                <input id='address'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`}
                                                                       name='address'
                                                                       placeholder="Entrez votre adresse de résidence"
                                                                       aria-label="Address"
                                                                       autoComplete="address" maxLength="200"
                                                                       value={this.state.address || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('address')}
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
                                                                <input id='site_internet'
                                                                       type='url'
                                                                       className={`form-control ${this.hasErrorFor('site_internet') ? 'is-invalid' : ''}`}
                                                                       name='site_internet'
                                                                       placeholder="https://www.ivemo.com"
                                                                       aria-label="https://www.ivemo.com"
                                                                       autoComplete="site_internet"
                                                                       value={this.state.site_internet || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('site_internet')}
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row className="my-4">
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
                                                                       value={this.state.birthdate}
                                                                       className={`form-control form-control-date ${this.hasErrorFor('birthdate') ? 'is-invalid' : ''}`}
                                                                       onChange={this.handleFieldChange}
                                                                       placeholder="Date de Naissance"
                                                                       name='birthdate'
                                                                       required="required"
                                                                />
                                                                {this.renderErrorFor('birthdate')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label htmlFor="city_id"><b>Votre Ville</b></label>
                                                            <div className="form-group">
                                                                <select value={this.state.city_id || ''}
                                                                        className={`form-control ${this.hasErrorFor('city_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="city_id"
                                                                        required="required">
                                                                    <option disabled hidden selected value="">Votre ville</option>
                                                                    {cities.map((item) => (
                                                                        <option key={item.id}
                                                                                value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('city_id')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <label htmlFor="categoryprofile_id"><b>Pourquoi êtes-vous sur Ivemo ?</b></label>
                                                            <div className="form-group">
                                                                <select value={this.state.categoryprofile_id || ''}
                                                                        className={`form-control ${this.hasErrorFor('categoryprofile_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange}
                                                                        name="categoryprofile_id" required="required">
                                                                    <option disabled hidden selected value="">Pourquoi êtes-vous sur
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
                                                                                            <input id='site_internet'
                                                                                                   type='url'
                                                                                                   className={`form-control ${this.hasErrorFor('site_internet') ? 'is-invalid' : ''}`}
                                                                                                   name='site_internet'
                                                                                                   placeholder="https://www.ivemo.com"
                                                                                                   aria-label="https://www.ivemo.com"
                                                                                                   autoComplete="site_internet"
                                                                                                   value={this.state.site_internet || ''}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('site_internet')}
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
                                                                                            <input id='twitter_link'
                                                                                                   type='text'
                                                                                                   className={`form-control ${this.hasErrorFor('twitter_link') ? 'is-invalid' : ''}`}
                                                                                                   name='twitter_link'
                                                                                                   placeholder="Lien de profil "
                                                                                                   aria-label="Lien de profile "
                                                                                                   autoComplete="Lien de profile twitter"
                                                                                                   value={this.state.twitter_link || ''}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('twitter_link')}
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
                                                                                            <input id='linkedin_link'
                                                                                                   type='url'
                                                                                                   className={`form-control ${this.hasErrorFor('linkedin_link') ? 'is-invalid' : ''}`}
                                                                                                   name='linkedin_link'
                                                                                                   placeholder="Linkedin profile"
                                                                                                   aria-label="https://www.ivemo.com"
                                                                                                   autoComplete="linkedin_link"
                                                                                                   value={this.state.linkedin_link || ''}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('linkedin_link')}
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
                                                                                            <input id='instagram_link'
                                                                                                   type='text'
                                                                                                   className={`form-control ${this.hasErrorFor('instagram_link') ? 'is-invalid' : ''}`}
                                                                                                   name='instagram_link'
                                                                                                   placeholder="Lien de profile "
                                                                                                   aria-label="Lien de profile "
                                                                                                   autoComplete="Lien de profile twitter"
                                                                                                   value={this.state.instagram_link || ''}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('instagram_link')}
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
                                                                                            <input id='facebook_link'
                                                                                                   type='text'
                                                                                                   className={`form-control ${this.hasErrorFor('facebook_link') ? 'is-invalid' : ''}`}
                                                                                                   name='facebook_link'
                                                                                                   placeholder="Lien profile facebook"
                                                                                                   aria-label="facebook_link"
                                                                                                   autoComplete="facebook_link"
                                                                                                   value={this.state.facebook_link || ''}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('facebook_link')}
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
                                                                                            <input id='youtube_link'
                                                                                                   type='text'
                                                                                                   className={`form-control ${this.hasErrorFor('youtube_link') ? 'is-invalid' : ''}`}
                                                                                                   name='youtube_link'
                                                                                                   placeholder="Lien compte youtube"
                                                                                                   aria-label="youtube_link"
                                                                                                   autoComplete="youtube_link"
                                                                                                   value={this.state.youtube_link || ''}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('youtube_link')}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mb-4">
                                                                                    <div className="col-md-12">
                                                                                        <label
                                                                                            htmlFor="description"><b>Description </b></label>
                                                                                        <FormGroup>
                                                                                            <label className="labels">Décrivez
                                                                                                votre article <span
                                                                                                    className="text-danger">*</span>
                                                                                            </label>
                                                                                            <br/>
                                                                                            <Input type="textarea"
                                                                                                   name="description"
                                                                                                   value={this.state.description || ""}
                                                                                                   onChange={this.handleFieldChange}
                                                                                                   placeholder={'Donner une description...'}
                                                                                                   className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                                                   id="description"
                                                                                                   rows="17"/>
                                                                                            {this.renderErrorFor('description')}
                                                                                            {/*
                                                                                         <ReactQuill theme="snow" modules={this.modules}
                                                                                                    formats={this.formats}
                                                                                                    className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                                                    value={this.state.description || ''}
                                                                                                    onChange={this.handleChangeBody} />
                                                                                        {this.renderErrorFor('description')}
                                                                                    */}
                                                                                        </FormGroup>
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
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_avis"
                                                                                                    checked={this.state.status_avis || false}
                                                                                                    value={this.state.status_avis}
                                                                                                    onChange={this.handleCheckClick}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Affichez ou masquez
                                                                                                    les avis des
                                                                                                    utilisateurs</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_team_user"
                                                                                                    checked={this.state.status_team_user || false}
                                                                                                    value={this.state.status_team_user}
                                                                                                    onChange={this.handleStatusTeamUser}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Affichez ou masquez
                                                                                                    votre team</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_annonce_locations"
                                                                                                    checked={this.state.status_annonce_locations || false}
                                                                                                    value={this.state.status_annonce_locations}
                                                                                                    onChange={this.handleStatusAnnonceLocation}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Affichez ou masquez
                                                                                                    vos annonces de
                                                                                                    locations</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_annonce_reservations"
                                                                                                    checked={this.state.status_annonce_reservations || false}
                                                                                                    value={this.state.status_annonce_reservations}
                                                                                                    onChange={this.handleStatusAnnonceReservation}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Affichez ou masquez
                                                                                                    vos annonces en
                                                                                                    réservations</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_annonce_ventes"
                                                                                                    checked={this.state.status_annonce_ventes || false}
                                                                                                    value={this.state.status_annonce_ventes}
                                                                                                    onChange={this.handleStatusAnnonceVente}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Affichez ou masquez
                                                                                                    vos annonces de
                                                                                                    ventes</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_employments"
                                                                                                    checked={this.state.status_employments || false}
                                                                                                    value={this.state.status_employments}
                                                                                                    onChange={this.handleStatusEmployments}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Affichez ou masquez
                                                                                                    vos offres
                                                                                                    d'emplois</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_comments"
                                                                                                    checked={this.state.status_comments || false}
                                                                                                    value={this.state.status_comments}
                                                                                                    onChange={this.handleStatusComments}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Notifications des
                                                                                                    commentaires {this.state.status_comments ? "activés" : "désactivés"} </b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_responsecomments"
                                                                                                    checked={this.state.status_responsecomments || false}
                                                                                                    value={this.state.status_responsecomments}
                                                                                                    onChange={this.handleStatusResponseComments}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Notifications sur les
                                                                                                    réponses de vos
                                                                                                    commentaires {this.state.status_responsecomments ? "activés" : "désactivés"}</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input
                                                                                                    className="form-check-input"
                                                                                                    type="checkbox"
                                                                                                    name="status_contactservice"
                                                                                                    checked={this.state.status_contactservice || false}
                                                                                                    value={this.state.status_contactservice}
                                                                                                    onChange={this.handleStatusContactService}/>
                                                                                                <span
                                                                                                    className="form-check-sign"/>
                                                                                                <b>Notifications sur vos
                                                                                                    offres
                                                                                                    d'emplois {this.state.status_contactservice ? "activés" : "désactivés"} </b>
                                                                                            </label>
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
                                                    <hr/>
                                                    <div className="submit text-center">
                                                        <button className="btn btn-primary btn-round btn-lg"
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
