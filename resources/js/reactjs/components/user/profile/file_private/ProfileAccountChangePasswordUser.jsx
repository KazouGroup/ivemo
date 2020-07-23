import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";
import HeaderProfileAccountPrivate from "./HeaderProfileAccountPrivate";
import Row from "reactstrap/es/Row";

class ProfileAccountChangePasswordUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            password: '',
            passwordType: 'password',
            password_confirmation: '',
            password_confirmationType: 'password',
            errors: [],
        };
        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleHideShowPassword = this.handleHideShowPassword.bind(this);
        this.handleHideShowPasswordConfirmation = this.handleHideShowPasswordConfirmation.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleHideShowPassword() {
        this.setState({
            passwordType:
                this.state.passwordType === "password" ? "text" : "password",
        });
    }

    handleHideShowPasswordConfirmation() {
        this.setState({
            password_confirmationType:
                this.state.password_confirmationType === "password" ? "text" : "password",
        });
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
            password: this.state.password,
            old_password: this.state.old_password,
            password_confirmation: this.state.password_confirmation,
        };
        dyaxios.put(route('update_password.site'), item)
            .then(() => {
                $.notify({message: 'Votre Mot de Passe a été mis à jour avec succés.'},
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
                this.setState({
                    password: "",
                    old_password: "",
                    password_confirmation: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    loadItems() {
        dyaxios.get(route('api_profile_account.site')).then(response =>
            this.setState({
                password: response.data.password,
            }));
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
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
                                <form role="form" id="contact-form" onSubmit={this.updateItem} acceptCharset="UTF-8">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 mx-auto">
                                            <NavProfileAccountPrivate/>
                                        </div>
                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="card">
                                                <div className="card-body">
                                                    <HeaderProfileAccountPrivate/>
                                                    <hr/>
                                                    <Row className="my-2">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist"
                                                                 aria-multiselectable="true"
                                                                 className="card-collapse">
                                                                <label htmlFor="address">
                                                                    <b>Mot de Passe Actuel</b>
                                                                </label>
                                                                <div className="input-group mb-4">
                                                                    <div className="input-group-prepend">
                                                                         <span className="input-group-text">
                                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                                         </span>
                                                                    </div>
                                                                    <input id='old_password'
                                                                           type={this.state.passwordType}
                                                                           className={`form-control ${this.hasErrorFor('old_password') ? 'is-invalid' : ''}`}
                                                                           name='old_password'
                                                                           required={'required'}
                                                                           placeholder="Mot de Passe Actuel"
                                                                           aria-label="old_password"
                                                                           autoComplete="old_password"
                                                                           value={this.state.old_password || ''}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('old_password')}
                                                                </div>
                                                                <div className="ivemoShowRidePasswordTop ivemoShowRidePassword" onClick={this.handleHideShowPassword}>
                                                                    <i className={`fa fa-${this.state.passwordType === "password" ? "lock" : "unlock"}`}></i>
                                                                </div>
                                                                <label htmlFor="address"><b>Nouveau Mot de Passe</b></label>
                                                                <div className="input-group mb-4">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text">
                                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                                        </span>
                                                                    </div>
                                                                    <input id='password'
                                                                           type={this.state.password_confirmationType}
                                                                           className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                                                           name='password'
                                                                           required={'required'}
                                                                           placeholder="Nouveau Mot de Passe"
                                                                           aria-label="password"
                                                                           autoComplete="password"
                                                                           value={this.state.password || ''}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('password')}
                                                                </div>
                                                                <div className="ivemoShowRidePasswordTop ivemoShowRidePassword" onClick={this.handleHideShowPasswordConfirmation}>
                                                                    <i className={`fa fa-${this.state.password_confirmationType === "password" ? "lock" : "unlock"}`}></i>
                                                                </div>
                                                                <label htmlFor="address"><b>Confirmation Mot de Passe</b></label>
                                                                <div className="input-group mb-4">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text">
                                                                              <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                                         </span>
                                                                    </div>
                                                                    <input id='password_confirmation'
                                                                           type={this.state.password_confirmationType}
                                                                           className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`}
                                                                           name='password_confirmation'
                                                                           required={'required'}
                                                                           placeholder="Confirmation Mot de Passe"
                                                                           aria-label="password_confirmation"
                                                                           autoComplete="password_confirmation"
                                                                           value={this.state.password_confirmation || ''}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('password_confirmation')}
                                                                </div>
                                                                <div className="ivemoShowRidePasswordTop ivemoShowRidePassword" onClick={this.handleHideShowPasswordConfirmation}>
                                                                    <i className={`fa fa-${this.state.password_confirmationType === "password" ? "lock" : "unlock"}`}></i>
                                                                </div>
                                                                <hr/>
                                                                <div className="submit text-center">
                                                                    <button className="btn btn-primary btn-round btn-lg" type="submit">
                                                                        <b><i className="now-ui-icons ui-1_check "/> Changer</b>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <FooterBigUserSite/>
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
