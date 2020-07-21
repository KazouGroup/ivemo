import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form, Input, InputGroup, Row, CardBody, Col, CardTitle, FormGroup} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";
import moment from "moment";


class ProfileConfigUser extends Component {
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
            handleStatusContactService:'',
            categoryprofile_id: '',
            description: '',
            cities: [],
            categoryprofiles: [],
            errors: [],
        };
        this.modules = {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
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
        this.setState({ description: value });
        document.querySelector('.editor-control').classList.remove('is-invalid');
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    handleCheckClick(){
        this.setState({ status_avis: !this.state.status_avis });
    };

    handleStatusTeamUser(){
        this.setState({ status_team_user: !this.state.status_team_user });
    };

    handleStatusAnnonceLocation(){
        this.setState({ status_annonce_locations: !this.state.status_annonce_locations });
    };

    handleStatusAnnonceReservation(){
        this.setState({ status_annonce_reservations: !this.state.status_annonce_reservations });
    };

    handleStatusAnnonceVente(){
        this.setState({ status_annonce_ventes: !this.state.status_annonce_ventes });
    };

    handleStatusEmployments(){
        this.setState({ status_employments: !this.state.status_employments });
    };

    handleStatusComments(){
        this.setState({ status_comments: !this.state.status_comments });
    };

    handleStatusResponseComments(){
        this.setState({ status_responsecomments: !this.state.status_responsecomments });
    };

    handleStatusContactService(){
        this.setState({ status_contactservice: !this.state.status_contactservice });
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
        dyaxios.put(route('profile_add_info_account.update',[itemprofile]), item)
            .then(() => {
                $.notify({
                        // title: 'Update FAQ',
                        message: 'Votre profil a été mis à jour avec succès'
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
        dyaxios.get(route('api.categoryprofiles')).then(response => this.setState({ categoryprofiles: response.data, }));
        dyaxios.get(route('api.all_cities')).then(response => this.setState({ cities: response.data, }));
        const itemprofile = this.props.match.params.profile;
        dyaxios.get(route('api_profile_add_info_account.site',[itemprofile])).then(response =>
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
    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        const {categoryprofiles,cities} = this.state;
        return (

            <>
                <Helmet>
                    <title> {`${$userIvemo.first_name || "Profile"}`} - {$name_site}</title>
                </Helmet>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>
                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br />
                                <Form role="form" id="contact-form" onSubmit={this.updateItem} acceptCharset="UTF-8">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 mx-auto">

                                            <NavProfileAccountPrivate />

                                        </div>
                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="card">

                                                <CardBody>
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <NavLink to={`/pro/${$userIvemo.slug}/`}>
                                                                <img src={$userIvemo.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                            </NavLink>
                                                            <div className="mx-3">
                                                                <NavLink to={`/pro/${$userIvemo.slug}/`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                    <small className="d-block text-muted">{moment($userIvemo.created_at).format('LL')}</small>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                <i className="now-ui-icons tech_mobile"/>
                                                            </Button>
                                                            {this.state.site_internet && (
                                                                <a href={`${this.state.site_internet}`} className="btn btn-sm btn-secondary" target="_banck">
                                                                    <i className="now-ui-icons objects_globe"/>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="card-title">
                                                        {this.state.address && (
                                                            <>
                                                                <i className="now-ui-icons location_pin"/> <b>{this.state.address}</b>
                                                                <br />
                                                            </>
                                                        )}

                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-6 col-6">
                                                                    <Link to={`/pro/${$userIvemo.slug}/`} title="Profil agence">
                                                                        <small><b>Consulter le profil de votre agence</b></small>
                                                                    </Link>
                                                                </div>
                                                                {this.state.site_internet && (
                                                                    <div className="col-md-6 col-6">
                                                                        <a href={`${this.state.site_internet}`} target="_blank" title="Site internet de agence">
                                                                            <small><b>Consulter le site web de votre agence</b></small>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr/>
                                                    <Row>
                                                        <div className="col-md-6 col-6">
                                                            <label
                                                                htmlFor="address"><b>Adresse de résidence</b></label>
                                                            <div className="input-group">
                                                                <div
                                                                    className="input-group-prepend">
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
                                                            <label htmlFor="url_site"><b>Site
                                                                internet</b></label>
                                                            <div className="input-group">
                                                                <div
                                                                    className="input-group-prepend">
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
                                                    <Row>
                                                        <div className="col-md-4">
                                                            <div className="form-group">

                                                                <select value={this.state.birthdate || ''} className={`form-control ${this.hasErrorFor('birthdate') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="birthdate" required="required">
                                                                    <option value="" disabled>Année de naissance</option>
                                                                    <option value="2021"> 2021</option>
                                                                    <option value="2020"> 2020</option>
                                                                    <option value="2019"> 2019</option>
                                                                    <option value="2018"> 2018</option>
                                                                    <option value="2017"> 2017</option>
                                                                    <option value="2016"> 2016</option>
                                                                    <option value="2015"> 2015</option>
                                                                    <option value="2014"> 2014</option>
                                                                    <option value="2013"> 2013</option>
                                                                    <option value="2012"> 2012</option>
                                                                    <option value="2011"> 2011</option>
                                                                    <option value="2010"> 2010</option>
                                                                    <option value="2009"> 2009</option>
                                                                    <option value="2008"> 2008</option>
                                                                    <option value="2007"> 2007</option>
                                                                    <option value="2006"> 2006</option>
                                                                    <option value="2005"> 2005</option>
                                                                    <option value="2004"> 2004</option>
                                                                    <option value="2003"> 2003</option>
                                                                    <option value="2002"> 2002</option>
                                                                    <option value="2001"> 2001</option>
                                                                    <option value="2000"> 2000</option>
                                                                    <option value="1999"> 1999</option>
                                                                    <option value="1998"> 1998</option>
                                                                    <option value="1997"> 1997</option>
                                                                    <option value="1996"> 1996</option>
                                                                    <option value="1995"> 1995</option>
                                                                    <option value="1994"> 1994</option>
                                                                    <option value="1993"> 1993</option>
                                                                    <option value="1992"> 1992</option>
                                                                    <option value="1991"> 1991</option>
                                                                    <option value="1990"> 1990</option>
                                                                    <option value="1989"> 1989</option>
                                                                    <option value="1988"> 1988</option>
                                                                    <option value="1987"> 1987</option>
                                                                    <option value="1986"> 1986</option>
                                                                    <option value="1985"> 1985</option>
                                                                    <option value="1984"> 1984</option>
                                                                    <option value="1983"> 1983</option>
                                                                    <option value="1982"> 1982</option>
                                                                    <option value="1981"> 1981</option>
                                                                    <option value="1980"> 1980</option>
                                                                    <option value="1979"> 1979</option>
                                                                    <option value="1978"> 1978</option>
                                                                    <option value="1977"> 1977</option>
                                                                    <option value="1976"> 1976</option>
                                                                    <option value="1975"> 1975</option>
                                                                    <option value="1974"> 1974</option>
                                                                    <option value="1973"> 1973</option>
                                                                    <option value="1972"> 1972</option>
                                                                    <option value="1971"> 1971</option>
                                                                    <option value="1970"> 1970</option>
                                                                    <option value="1969"> 1969</option>
                                                                    <option value="1968"> 1968</option>
                                                                    <option value="1967"> 1967</option>
                                                                    <option value="1966"> 1966</option>
                                                                    <option value="1965"> 1965</option>
                                                                    <option value="1964"> 1964</option>
                                                                    <option value="1963"> 1963</option>
                                                                    <option value="1962"> 1962</option>
                                                                    <option value="1961"> 1961</option>
                                                                    <option value="1960"> 1960</option>
                                                                    <option value="1959"> 1959</option>
                                                                    <option value="1958"> 1958</option>
                                                                    <option value="1957"> 1957</option>
                                                                    <option value="1956"> 1956</option>
                                                                    <option value="1955"> 1955</option>
                                                                    <option value="1954"> 1954</option>
                                                                    <option value="1953"> 1953</option>
                                                                    <option value="1952"> 1952</option>
                                                                    <option value="1951"> 1951</option>
                                                                    <option value="1950"> 1950</option>
                                                                    <option value="1949"> 1949</option>
                                                                    <option value="1948"> 1948</option>
                                                                    <option value="1947"> 1947</option>
                                                                    <option value="1946"> 1946</option>
                                                                    <option value="1945"> 1945</option>
                                                                    <option value="1944"> 1944</option>
                                                                    <option value="1943"> 1943</option>
                                                                    <option value="1942"> 1942</option>
                                                                    <option value="1941"> 1941</option>
                                                                    <option value="1940"> 1940</option>
                                                                    <option value="1939"> 1939</option>
                                                                    <option value="1938"> 1938</option>
                                                                    <option value="1937"> 1937</option>
                                                                    <option value="1936"> 1936</option>
                                                                    <option value="1935"> 1935</option>
                                                                    <option value="1934"> 1934</option>
                                                                    <option value="1933"> 1933</option>
                                                                    <option value="1932"> 1932</option>
                                                                    <option value="1931"> 1931</option>
                                                                    <option value="1930"> 1930</option>
                                                                    <option value="1929"> 1929</option>
                                                                    <option value="1928"> 1928</option>
                                                                    <option value="1927"> 1927</option>
                                                                    <option value="1926"> 1926</option>
                                                                    <option value="1925"> 1925</option>
                                                                    <option value="1924"> 1924</option>
                                                                    <option value="1923"> 1923</option>
                                                                    <option value="1922"> 1922</option>
                                                                    <option value="1921"> 1921</option>
                                                                </select>

                                                                {this.renderErrorFor('birthdate')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <select value={this.state.city_id || ''} className={`form-control ${this.hasErrorFor('city_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="city_id" required="required">
                                                                    <option value="" disabled>Votre ville</option>
                                                                    {cities.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('city_id')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="form-group">

                                                                <select value={this.state.categoryprofile_id || ''} className={`form-control ${this.hasErrorFor('categoryprofile_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="categoryprofile_id" required="required">
                                                                    <option value="" disabled>Pourquoi êtes-vous sur Ivemo</option>
                                                                    {categoryprofiles.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>

                                                                {this.renderErrorFor('categoryprofile_id')}
                                                            </div>
                                                        </div>

                                                    </Row>

                                                    <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingDue">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseDue" aria-expanded="false" aria-controls="collapseDue">
                                                                    <b>Site internet et reseaux sociaux</b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseDue" className="collapse" role="tabpanel" aria-labelledby="headingDue">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                                <div className="row">
                                                                                    <div className="col-md-6 col-6">
                                                                                        <label htmlFor="url_site"><b>Site
                                                                                            internet</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
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
                                                                                    <div className="col-md-6 col-6">
                                                                                        <label htmlFor="url_site"><b>Twitter </b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span className="input-group-text">
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
                                                                                <div className="row">
                                                                                    <div className="col-md-6">
                                                                                        <label htmlFor="url_site"><b>Linkedin</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                    <span className="input-group-text">
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

                                                                                        <label htmlFor="url_site"><b>Instagram</b></label>
                                                                                        <div className="input-group">
                                                                                            <div
                                                                                                className="input-group-prepend">
                                                                                                <span className="input-group-text">
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

                                                                                <div className={`row`}>
                                                                                    <div className="col-md-6">

                                                                                        <label htmlFor="title"><b>Facebook</b></label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <span className="input-group-text">
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
                                                                                        <label htmlFor="title"><b>Youtube</b></label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <span className="input-group-text">
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

                                                                                <label htmlFor="description"><b>Description </b></label>
                                                                                <FormGroup>
                                                                                    <label className="labels">
                                                                                        Décrivez votre article
                                                                                        <span className="text-danger">*</span>
                                                                                    </label>
                                                                                    <br />
                                                                                    <Input type="textarea" name="description" value={this.state.description || ""}
                                                                                           onChange={this.handleFieldChange}
                                                                                           placeholder={'Donner une description...'}
                                                                                           className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                                           id="description"
                                                                                           rows="17" />
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

                                                    <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTre">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTre" aria-expanded="false" aria-controls="collapseTre">
                                                                    <b>Notifications et status</b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTre" className="collapse" role="tabpanel" aria-labelledby="headingTre">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_avis" checked={this.state.status_avis} value={this.state.status_avis}  onChange={this.handleCheckClick}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Affichez ou masquez les avis des utilisateurs</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_team_user" checked={this.state.status_team_user} value={this.state.status_team_user}  onChange={this.handleStatusTeamUser}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Affichez ou masquez votre team</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_annonce_locations" checked={this.state.status_annonce_locations} value={this.state.status_annonce_locations}  onChange={this.handleStatusAnnonceLocation}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Affichez ou masquez vos annonces en locations</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_annonce_reservations" checked={this.state.status_annonce_reservations} value={this.state.status_annonce_reservations}  onChange={this.handleStatusAnnonceReservation}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Affichez ou masquez vos annonces en reservations</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_annonce_ventes" checked={this.state.status_annonce_ventes} value={this.state.status_annonce_ventes}  onChange={this.handleStatusAnnonceVente}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Affichez ou masquez vos annonces de ventes</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_employments" checked={this.state.status_employments} value={this.state.status_employments}  onChange={this.handleStatusEmployments}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Affichez ou masquez vos offres d'emplois</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_comments" checked={this.state.status_comments} value={this.state.status_comments}  onChange={this.handleStatusComments}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Notifications des commentaires {this.state.status_comments ? "activés" : "désactivés"} </b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_responsecomments" checked={this.state.status_responsecomments} value={this.state.status_responsecomments}  onChange={this.handleStatusResponseComments}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Notifications sur les réponses de vos commentaires {this.state.status_responsecomments ? "activés" : "désactivés"}</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mx-auto">
                                                                                        <div className="form-check">
                                                                                            <label
                                                                                                className="form-check-label">
                                                                                                <Input className="form-check-input"
                                                                                                    type="checkbox" name="status_contactservice" checked={this.state.status_contactservice} value={this.state.status_contactservice}  onChange={this.handleStatusContactService}/>
                                                                                                    <span className="form-check-sign"/>
                                                                                                    <b>Notifications sur vos offres d'emplois {this.state.status_contactservice ? "activés" : "désactivés"} </b>
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

                                                    <div className="submit text-center">
                                                        <button className="btn btn-primary" type="submit">
                                                            <b>Enregistrer</b>
                                                        </button>
                                                    </div>
                                                </CardBody>

                                            </div>
                                        </div>
                                    </div>

                                </Form>

                            </div>
                        </div>
                        <FooterBigUserSite />
                    </div>
                </div>

            </>

        )
    }
}
export default ProfileConfigUser;
