import React, { Component,Fragment } from "react";
import {Link, NavLink} from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import {Button, FormGroup, Row,InputGroup} from "reactstrap";
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";


class EmailresetUser extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.state = {
            email: '',
            errors: [],
        }

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

    saveItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
        };
        dyaxios.post(route('password.email'), item)
            .then(() => {
                Swal.fire({
                    text: "Nous vous avons envoyé par courriel le lien de réinitialisation du mot de passe",
                    icon: 'success',
                    footer: '<a href>Why do I have this issue?</a>',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-info",
                    confirmButtonText: 'Ok, compris',
                    reverseButtons: true,
                });

                this.setState({
                    email: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Quelque chose ne va pas. Essayer plus tard...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    // lifecycle method
    componentDidMount() {
      //
    }
    render() {
        return (
            <div className="register-page sidebar-collapse">

                <Helmet title={`Reset Password - ${$name_site}`}/>

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

                                        {$guest && (
                                            <Fragment>
                                                <h4 className="text-dark"><b>Se connecter</b></h4>
                                                <div className="social text-center">
                                                    <a href={route('social.oauth', 'facebook')} className="btn btn-facebook btn-round">
                                                        <i className="fab fa-facebook"/> Se connecter avec Facebook
                                                    </a>
                                                    <a href={route('social.oauth', 'google')} className="btn btn-google btn-round">
                                                        <i className="fab fa-google"/> Se connecter avec Google
                                                    </a>
                                                </div>
                                            </Fragment>
                                        )}

                                        <br/>
                                        <h5 className="text-dark">
                                            <b>Ajouter votre email pour réinitialiser votre mot de passe</b>
                                        </h5>
                                        <form role="form" id="contact-form" onSubmit={this.saveItem} acceptCharset="UTF-8">


                                            <InputGroup>
                                                <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons ui-1_email-85"></i>
                                                            </span>
                                                </div>
                                                <input id='email'
                                                       type='email'
                                                       className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                       name='email'
                                                       placeholder="Email"
                                                       aria-label="Email"
                                                       required
                                                       autoComplete="email"
                                                       autoFocus
                                                       value={this.state.email}
                                                       onChange={this.handleFieldChange}
                                                />
                                                {this.renderErrorFor('email')}
                                            </InputGroup>

                                            <div className="submit text-center">
                                                <button className="btn btn-primary btn-round" type="submit">
                                                    Envoyer le lien de réinitialisation du mot de passe
                                                </button>
                                            </div>
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

export default EmailresetUser;
