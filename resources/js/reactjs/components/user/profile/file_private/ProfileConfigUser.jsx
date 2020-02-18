import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form, Input, InputGroup, Row, CardBody,Col,CardTitle} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";
import moment from "moment";


class ProfileConfigUser extends Component {
    constructor(props) {
        super(props);

        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.state = {
            facebook_link: '',
            twitter_link: '',
            address: '',
            instagram_link: '',
            linkedin_link: '',
            site_internet: '',
            description: '',
            errors: [],
        };
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }
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
            instagram_link: this.state.instagram_link,
            address: this.state.address,
            linkedin_link: this.state.linkedin_link,
            site_internet: this.state.site_internet,
            description: this.state.description,
        };
        dyaxios.put(route('profile_add_info_account.update',[itemprofile]), item)
            .then(() => {
                $.notify({
                        // title: 'Update FAQ',
                        message: 'Profil mis à jour correctement'
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
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            $.notify("Ooop! Something wrong. Try later...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        });
    }

    loadItem() {
        const itemprofile = this.props.match.params.profile;
        dyaxios.get(route('api_profile_add_info_account.site',[itemprofile])).then(response =>
            this.setState({
                facebook_link: response.data.facebook_link,
                twitter_link: response.data.twitter_link,
                instagram_link: response.data.instagram_link,
                linkedin_link: response.data.linkedin_link,
                address: response.data.address,
                site_internet: response.data.site_internet,
                description: response.data.description,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        return (

            <>
                <Helmet>
                    <title> {`${$userIvemo.first_name || "Profile"}`} - Ivemo</title>
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
                                                    <CardTitle>
                                                        <b>Contact de votre agence</b>
                                                    </CardTitle>

                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <NavLink to={`/@${$userIvemo.slug}/`}>
                                                                <img src={$userIvemo.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                            </NavLink>
                                                            <div className="mx-3">
                                                                <NavLink to={`/@${$userIvemo.slug}/`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                    <small className="d-block text-muted">{moment($userIvemo.created_at).format('LL')}</small>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                <i className="now-ui-icons tech_mobile"/>
                                                            </Button>
                                                            {this.state.site_internet && (
                                                                <a href={`${this.state.site_internet}`} className="btn btn-sm btn-primary" target="_banck">
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
                                                                    <Link to={`/@${$userIvemo.slug}/`} title="Profil agence">
                                                                        <small><b>Consulter le profil de votre agence</b></small>
                                                                    </Link>
                                                                </div>
                                                                {this.state.site_internet && (
                                                                    <div className="col-md-6 col-6">
                                                                        <a href={`${this.state.site_internet}`} target="_blank" title="Site internet de agence">
                                                                            <small><b>Consulter le site de votre agence</b></small>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr/>

                                                    <Row>
                                                        <div className="col-md-7 col-7">
                                                            <label
                                                                htmlFor="address"><b>Addres</b></label>
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
                                                                       placeholder="Ou est citué votre agence"
                                                                       aria-label="Address"
                                                                       autoComplete="address"
                                                                       value={this.state.address || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('address')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-5 col-5">
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

                                                    </Row>

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
                                                                       placeholder="Lien de profile "
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
                                                        <div className="col-md-6 col-6">
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
                                                        <div className="col-md-6 col-6">

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

                                                    <label htmlFor="url_site"><b>Description </b></label>
                                                    <div className="form-group">
                                                                                    <textarea name="description"
                                                                                              value={this.state.description || ''}
                                                                                              onChange={this.handleFieldChange}
                                                                                              placeholder={'Ex: Crée depuis 2020 nous evrons dans l\'esposion et l\'echange'}
                                                                                              className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                                              id="description"
                                                                                              rows="10"/>
                                                        {this.renderErrorFor('description')}
                                                    </div>

                                                    <div className="submit text-center">
                                                        <button className="btn btn-success" type="submit">
                                                            <i className="now-ui-icons ui-1_check"/>
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
