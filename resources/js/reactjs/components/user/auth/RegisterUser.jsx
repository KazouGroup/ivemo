import React, { Component } from "react";
import { Link } from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import {FormGroup, Input, Row} from "reactstrap";
import FieldInput from "../../inc/vendor/FieldInput";


class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.handleHideShowPassword = this.handleHideShowPassword.bind(this);
        this.handleHideShowPasswordConfirmation = this.handleHideShowPasswordConfirmation.bind(this);
        this.state = {
            username: '',
            first_name: '',
            email: '',
            password: '',
            passwordType: 'password',
            status_profile: '0',
            password_confirmation: '',
            password_confirmationType: 'password',
            categoryprofile_id: '',
            errors: [],
        }

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

    handleCheckClick(event){
        this.setState({
            status_profile: event.target.value
        });
    };

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

    saveItem(e) {
        e.preventDefault();

        let item = {
            username: this.state.username,
            first_name: this.state.first_name,
            status_profile: this.state.status_profile,
            email: this.state.email,
            categoryprofile_id: this.state.categoryprofile_id,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        };
        dyaxios.post(route('register'), item)
            .then(() => {
                window.location.replace(`/`);
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Quelque chose ne va pas. Essayez plus tard ...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

   // Lifecycle Component Method
    componentDidMount() {
        const composantTitle = `Inscription - ${$name_site}`;
        document.title = `${composantTitle}`;
    }
    render() {
        return (
            <div className="register-page sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="page-header header-filter" filter-color="black">
                    <div className="page-header-image" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/login.jpg' + ")" }}/>
                    <div className="content">
                        <div className="container">

                            <div className="col-md-7 ml-auto mr-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-description text-center"><b>S'inscrire avec</b></h4>
                                        <div className="social text-center">
                                            <a href={route('social.oauth', 'facebook')} className="btn btn-facebook btn-round">
                                                <i className="fab fa-facebook"/> Facebook
                                            </a>
                                            <a href={route('social.oauth', 'google')} className="btn btn-google btn-round">
                                                <i className="fab fa-google"/> Google
                                            </a>
                                            <h4 className="card-description">Ou</h4>
                                        </div>
                                        <form className="form" method="POST" onSubmit={this.saveItem}>
                                            <div className="row mb-4">
                                                <div className="col-md-6 text-left">
                                                    <div className="form-check form-check-radio text-dark">
                                                        <label className="form-check-label">
                                                            <Input className={`form-check-input ${this.hasErrorFor('status_profile') ? 'is-invalid' : ''}`} type="radio"
                                                                   name="status_profile" id="status_profile"
                                                                   value="0" onChange={this.handleCheckClick} checked={this.state.status_profile === "0"}/>
                                                            <span className="form-check-sign"></span>
                                                            Je suis un Particulier
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 text-left">
                                                    <div className="form-check form-check-radio text-dark">
                                                        <label className="form-check-label">
                                                            <input className={`form-check-input ${this.hasErrorFor('status_profile') ? 'is-invalid' : ''}`} type="radio"
                                                                   name="status_profile" id="status_profile"
                                                                   value="1" onChange={this.handleCheckClick} checked={this.state.status_profile === "1"}/>
                                                            <span className="form-check-sign"></span>
                                                            Je suis un Professionnel
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="now-ui-icons users_circle-08"/>
                                                    </span>
                                                        </div>
                                                        <FieldInput name="username" type='text' placeholder="Votre Pseudo" value={this.state.username}
                                                                    handleFieldChange={this.handleFieldChange}
                                                                    hasErrorFor={this.hasErrorFor}
                                                                    required="required"
                                                                    renderErrorFor={this.renderErrorFor}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="now-ui-icons users_circle-08"/>
                                                    </span>
                                                        </div>
                                                        <FieldInput name="first_name" type='text' placeholder="Votre Nom Complet" value={this.state.first_name}
                                                                    handleFieldChange={this.handleFieldChange}
                                                                    hasErrorFor={this.hasErrorFor}
                                                                    required="required"
                                                                    renderErrorFor={this.renderErrorFor} autoFocus/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-12">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/>
                                                        </span>
                                                        </div>
                                                        <FieldInput name="email" type='email' placeholder="Votre Adresse E-mail" value={this.state.email}
                                                                    handleFieldChange={this.handleFieldChange}
                                                                    hasErrorFor={this.hasErrorFor}
                                                                    required="required"
                                                                    renderErrorFor={this.renderErrorFor}/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*

                                            <div className="row">
                                                <div className="col-md-6">

                                                </div>

                                                 <div className="col-md-6">
                                                    <FormGroup>
                                                        <select name={'categoryprofile_id'} value={this.state.categoryprofile_id}
                                                                className={`form-control ${this.hasErrorFor('categoryprofile_id') ? 'is-invalid' : ''}`}
                                                                id="categoryprofile_id"  required="required" onChange={this.handleFieldChange}>
                                                            <option value="" disabled>Pourquoi êtes-vous sur Ivemo?</option>
                                                            <option value="">Je souhaite reserver</option>
                                                            <option value="">Je souhaite acheter</option>
                                                            <option value="">Je souhaite louer</option>
                                                            <option value="">Je souhaite reserver, acheter et/ ou louer</option>
                                                            <option value="">Je suis un professionel</option>
                                                            <option value="">Autre</option>
                                                        </select>
                                                        {this.renderErrorFor('categoryprofile_id')}
                                                    </FormGroup>
                                                </div>

                                            </div>
                                            */}
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                            </span>
                                                        </div>
                                                        <FieldInput name="password" minLength="8" type={this.state.passwordType} placeholder="Votre Mot de Passe" value={this.state.password}
                                                                    handleFieldChange={this.handleFieldChange}
                                                                    hasErrorFor={this.hasErrorFor}
                                                                    required="required"
                                                                    renderErrorFor={this.renderErrorFor}/>
                                                    </div>
                                                    <div className="ivemoShowRidePassword" onClick={this.handleHideShowPassword}>
                                                        <i className={`fa fa-${this.state.passwordType === "password" ? "lock" : "unlock"}`}></i>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                        </span>
                                                        </div>

                                                        <FieldInput name="password_confirmation" minLength="8" type={this.state.password_confirmationType}
                                                                    placeholder="Confirmez votre Mot de Passe" value={this.state.password_confirmation}
                                                                    handleFieldChange={this.handleFieldChange}
                                                                    hasErrorFor={this.hasErrorFor}
                                                                    required="required"
                                                                    renderErrorFor={this.renderErrorFor} autoFocus/>

                                                    </div>
                                                    <div className="ivemoShowRidePassword" onClick={this.handleHideShowPasswordConfirmation}>
                                                        <i className={`fa fa-${this.state.password_confirmationType === "password" ? "lock" : "unlock"}`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-center mb-4">
                                                <input type="submit" value="S' Enregistrer" className="btn btn-primary btn-round btn-lg"/>
                                            </div>
                                            <hr/>
                                            <h5 className="card-description">Vous avez déjà un compte sur Ivemo? <Link to="/login" className="ivemoColorOrange">Connectez-vous</Link></h5>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterUserSite/>
                </div>
            </div>
        )
    }
}

export default RegisterUser;
