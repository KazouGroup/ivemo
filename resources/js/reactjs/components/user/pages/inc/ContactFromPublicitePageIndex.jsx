import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import { Row,FormText,Input,InputGroup,FormGroup } from 'reactstrap';
import FieldInput from "../../../inc/vendor/FieldInput";


class ContactFromPublicitePageIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            appointment_time: '',
            full_name: '',
            confirm_send: '',
            phone: '',
            message: '',
            errors: [],
        };
        this.sendmessageItem = this.sendmessageItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        const  name = event.target.name;
        const type = event.target.value;
        const value = type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({
            [name]: value,
        });
        this.state.errors[name] = '';
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

    sendmessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            full_name: this.state.full_name,
            appointment_time: this.state.appointment_time,
            confirm_send: this.state.confirm_send,
            phone: this.state.phone,
            message: this.state.message,
        };
        let url = route('contactusersadverts_save.store');
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre message a été bien envoyé chez Ivemo`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInDown",
                            exit: "animate__animated animate__fadeOutUp"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    phone: "",
                    confirm_send: "",
                    appointment_time: "",
                    message: "",
                });
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

    render() {

        return (

            <div id="recallForm" className="container">
                <div className="row">
                    <div className="col-md-8 mr-auto ml-auto">
                        <h5 className="text-center title">Appelez-nous au {$phone_number} ou remplissez le formulaire pour etre contacté.</h5>
                        <form className="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons users_circle-08"/></span>
                                        </div>
                                        <FieldInput name="full_name" minLength="3" maxLength="200" type='text' placeholder="Nom complet" value={this.state.full_name}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor} required/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons ui-1_email-85"/></span>
                                        </div>
                                        <FieldInput name="email" minLength="3" maxLength="200" type='email' placeholder="Email..." value={this.state.email}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor}/>
                                    </InputGroup>
                                    <FormText className="text-muted" color="default" id="emailHelp">
                                    <b>Veuillez entrer une adresse e-mail valide </b>
                                    </FormText>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons tech_mobile"/></span>
                                        </div>
                                        <FieldInput name="phone" type='number' placeholder="Téléphone" value={this.state.phone}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <select id="appointment_time" value={this.state.appointment_time || ''} className={`form-control ${this.hasErrorFor('appointment_time') ? 'is-invalid' : ''}`}
                                                onChange={this.handleFieldChange} name="appointment_time" required="required">
                                            <option value="" disabled="">Preference oraire</option>
                                            <option value="09-13">09-13</option>
                                            <option value="13-15">13-15</option>
                                            <option value="15-18">15-18</option>
                                            <option value="09-18">N'importe quelle heure</option>
                                        </select>
                                        {this.renderErrorFor('appointment_date')}
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <InputGroup>
                                        <FieldInput name="message" type='textarea' minLength="5" maxLength="5000" placeholder="Posez ici toutes vos questions (optionel)!" value={this.state.message}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor} rows="17"/>
                                    </InputGroup>
                                </div>
                            </div>
                            <div
                                className="custom-control custom-checkbox mb-3">
                                <input name="confirm_send" className={`custom-control-input ${this.hasErrorFor('confirm_send') ? 'is-invalid' : ''}`}
                                       id="confirm_send" value="1" type="checkbox" onChange={this.handleFieldChange} checked={this.state.confirm_send}/>
                                <label className="custom-control-label"
                                       htmlFor="confirm_send">
                                            <span>Je suis majeur, j'ai lu et accepté
                                                <a className="text-primary" data-action="open-privacy-disclamer"> Informations de confidentialité</a>
                                            </span>
                                </label>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ml-auto mr-auto text-center">
                                    <button type="submit" className="btn btn-primary mt-4 btn-lg">
                                        Demandez à être contacté
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default ContactFromPublicitePageIndex;
