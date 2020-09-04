import React, { Component } from "react";
import { Link } from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import styles from "./inc/ContactUserSite.module.css";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import FieldInput from "../../inc/vendor/FieldInput";
import HelmetSite from "../../inc/user/HelmetSite";



class ContactUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            subject: '',
            message: '',
            errors: [],
        };
        this.createItem = this.createItem.bind(this);
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

    createItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            subject: this.state.subject,
            message: this.state.message,
        };
        dyaxios.post(route('contactadmins_save.store'), item)
            .then(() => {

                $.notify({
                        message: "Merçi pour votre message",
                    },
                    {
                        allow_dismiss: false,
                        type: 'success',
                        placement: {
                            from: 'bottom',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });
                this.setState({
                    email: "",
                    first_name: "",
                    last_name: "",
                    subject: "",
                    phone: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    render() {
        return (
            <>
                <HelmetSite title={`Contactez Nous - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg38.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h2 className="title">Contactez-nous</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main">
                            <div className="contact-content">
                                <br/>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8 ml-auto mr-auto">
                                            {!$guest &&(
                                                <>
                                                    {!$userIvemo.email_verified_at &&(
                                                        <LinkValicationEmail/>
                                                    )}
                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 ml-auto mr-auto">
                                            <h2 className="title text-center">Laissez-nous un message</h2>
                                            <h4 className="description text-center">Si vous rencontrez un problème, vous pouvez nous envoyer un message en remplissant le formulaire ci-dessous
                                                <br />
                                                <br />
                                            </h4>
                                            <form role="form" id="contact-form" onSubmit={this.createItem} acceptCharset="UTF-8">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Nom <span className={styles.requiredColor}>*</span></label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                            </div>
                                                            <FieldInput name="last_name" type='text' minLength="3" maxLength="250" placeholder="Nom" value={this.state.last_name}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>Prénom <span className={styles.requiredColor}>*</span></label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                            </div>
                                                            <FieldInput name="first_name" type='text' minLength="3" maxLength="250" placeholder="Prénom" value={this.state.first_name}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Email address</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="now-ui-icons ui-1_email-85"></i></span>
                                                            </div>
                                                            <FieldInput name="email" type='email' minLength="3" maxLength="250" placeholder="Email" value={this.state.email}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>Phone</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="now-ui-icons tech_mobile"></i></span>
                                                            </div>
                                                            <FieldInput name="phone" type='number' minLength="3" maxLength="30" placeholder="Numéro de tel" value={this.state.phone}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <label>Objet </label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="now-ui-icons text_caps-small"></i></span>
                                                    </div>
                                                    <FieldInput name="subject" type='text' minLength="3" maxLength="30" placeholder="Object... " value={this.state.subject}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Votre message</label>
                                                    <FieldInput name="message" type='textarea' minLength="6" maxLength="5000" placeholder="Message... " value={this.state.message}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}
                                                                                                    rows="10"/>
                                                </div>
                                                <div className="submit text-center">
                                                    <button className="btn btn-primary" type="submit">
                                                        <b>Envoyer mon message</b>
                                                    </button>
                                                </div>
                                            </form>
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

export default ContactUserSite;
