import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';


class ProfileAccountChangePasswordUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            avatar: '',
            errors: [],
            showDefaultImage: false,
        };
        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
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
        e.preventDefault();

        let item = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            subject: this.state.subject,
            message: this.state.message,
        };
        dyaxios.post(route('contact.save'), item)
            .then(() => {
                $.notify('<strong>Merçi pour votre message ...</strong>', {
                    allow_dismiss: false,
                    type: 'success',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    },
                    animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                    },
                });

                this.setState({
                    email: "",
                    first_name: "",
                    last_name: "",
                    subject: "",
                    message: "",
                });
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }

    loadItem() {
        dyaxios.get(route('api_profile_account.site')).then(response =>
            this.setState({
                password: response.data.password,
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
                    <title> {`${$userIvemo.first_name}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <form role="form" id="contact-form" onSubmit={this.updateItem} acceptCharset="UTF-8">

                                    <div className="row">

                                        <div className="col-lg-4 col-md-12 mx-auto">


                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                                                <div className="card-header text-center">

                                                                    <div className="profile text-center">
                                                                        <img src={$userIvemo.avatar} alt={$userIvemo.first_name} />
                                                                    </div>

                                                                </div>

                                                                <label htmlFor="title"><b>Pseudo</b></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                    </div>
                                                                    <input id='username'
                                                                        type='text'
                                                                        className={`form-control`}
                                                                        name='username'
                                                                        placeholder="Pseudo"
                                                                        aria-label="Pseudo"
                                                                        autoComplete="username"
                                                                        value={$userIvemo.username || ''}
                                                                    />
                                                                    {this.renderErrorFor('username')}
                                                                </div>
                                                                <label htmlFor="title"><b>Nom</b></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                    </div>
                                                                    <input id='first_name'
                                                                        type='text'
                                                                        className={`form-control`}
                                                                        name='first_name'
                                                                        placeholder="Non"
                                                                        aria-label="Nom"
                                                                        autoComplete="first_name"
                                                                        value={$userIvemo.first_name || ''}
                                                                    />
                                                                    {this.renderErrorFor('first_name')}
                                                                </div>
                                                                <label htmlFor="title"><b>Prénom</b></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                    </div>
                                                                    <input id='last_name'
                                                                        type='text'
                                                                        className={`form-control`}
                                                                        name='last_name'
                                                                        placeholder="Prénom"
                                                                        aria-label="Loyer mensuel charges comprises"
                                                                        autoComplete="last_name"
                                                                        value={$userIvemo.last_name || ''}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-lg-8 col-md-12 mx-auto">

                                            <ul class="nav nav-tabs nav-tabs-neutral justify-content-center" role="tablist" data-background-color={this.props.backgroundColor}>
                                                <li class="nav-item">
                                                    <NavLink to={`/profile/account/`} className="nav-link">
                                                        <i className="now-ui-icons users_circle-08"></i> Profile
                                                    </NavLink>
                                                </li>
                                                <li class="nav-item">
                                                    <NavLink to={`/profile/change_password/`} className="nav-link">
                                                        <i className="now-ui-icons ui-1_lock-circle-open"></i> Changer le mot de passe
                                                    </NavLink>
                                                </li>
                                            </ul>
                                            <br />


                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <b>Contact de votre agence</b>
                                                    </div>
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <NavLink to={`/profile/account/`}>
                                                                <img src="/assets/vendor/assets/img/bg1.jpg" style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                            </NavLink>
                                                            <div className="mx-3">
                                                                <NavLink to={`/profile/account/`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                    <small className="d-block text-muted"><b>{$userIvemo.last_name} {moment($userIvemo.created_at).format('DD/MM/YYYY')}</b></small>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                <i className="now-ui-icons tech_mobile"></i>
                                                            </Button>
                                                            {$userIvemo.url_site !== null && (
                                                                <a href={$userIvemo.url_site} className="btn btn-sm btn-primary" target="_banck">
                                                                    <i className="now-ui-icons objects_globe"></i>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="card-title">
                                                        {$userIvemo.address !== null && (
                                                            <><i className="now-ui-icons location_pin"></i> <b>{$userIvemo.address}</b></>
                                                        )}
                                                        <br />
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-6 col-6">
                                                                    <a href="https://www.kazoutech.com" title="Profil agence">
                                                                        <small><b>Consulter le profil de votre agence</b></small>
                                                                    </a>
                                                                </div>
                                                                {$userIvemo.url_site !== null && (
                                                                    <div className="col-md-6 col-6">
                                                                        <a href={$userIvemo.url_site} title="Site internet de agence" target="_banck">
                                                                            <small><b>Consulter votre site</b></small>
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTypebien">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTypebien" aria-expanded="true" aria-controls="collapseTypebien">
                                                                    <b>Changer le mot de passe </b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTypebien" className="collapse show" role="tabpanel" aria-labelledby="headingTypebien">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                                                                <label htmlFor="address"><b>Mot de passe actuelle</b></label>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text"><i className="now-ui-icons ui-1_lock-circle-open"></i></span>
                                                                                    </div>
                                                                                    <input id='password'
                                                                                        type='password'
                                                                                        className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                                                                        name='password'
                                                                                        placeholder="Mot de passe actuel"
                                                                                        aria-label="password"
                                                                                        autoComplete="password"
                                                                                        value={this.state.password || ''}
                                                                                        onChange={this.handleFieldChange}
                                                                                    />
                                                                                    {this.renderErrorFor('password')}
                                                                                </div>
                                                                                <label htmlFor="address"><b>Nouveau mot de passe</b></label>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text"><i className="now-ui-icons ui-1_lock-circle-open"></i></span>
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
                                                                                <label htmlFor="address"><b>Confirmer le mot de passe</b></label>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text"><i className="now-ui-icons ui-1_lock-circle-open"></i></span>
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
                                                                                
                                                                                <div className="submit text-center">
                                                                                    <button className="btn btn-success" type="submit">
                                                                                        <i className="now-ui-icons ui-1_check"></i> <b>Enregistrer</b>
                                                                                    </button>
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

                                        </div>


                                    </div>

                                </form>

                            </div>



                        </div>




                        <FooterBigUserSite />
                    </div>
                </div>


            </>

        )
    }
}
ProfileAccountChangePasswordUser.defaultProps = {
    backgroundColor: "black",
};

ProfileAccountChangePasswordUser.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default ProfileAccountChangePasswordUser;
